<template>
  <div class="course-section">
    <el-card>
      <div slot='header'>
        课程名称
      </div>
      <div style="padding: 20px;">
        <el-tree
          :data="sections"
          :props="defaultProps"
          @node-click="handleNodeClick"
          draggable
          :allow-drop="handleAllowDrop"
          @node-drop='handleSort'
        >
          <div class="inner" slot-scope="{node,data}">
            <span>{{node.label}}</span>
            <span v-if="data.sectionName" class="actions">
              <el-button>编辑</el-button>
              <el-button type="primary">添加课时</el-button>
              <el-button>状态</el-button>
            </span>
            <span v-else class="actions">
              <el-button>编辑</el-button>
              <el-button type="primary" @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  sectionId: node.parent.id,
                  lessonId: data.id
                }
              })">上传视频</el-button>
              <el-button>状态</el-button>
            </span>
          </div>
        </el-tree>
      </div>
    </el-card>
    <el-dialog
      title="章节信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <section-add-or-edit/>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getSectionAndLesson, saveOrUpdateSection } from '@/services/course-section'
import sectionAddOrEdit from './components/sectionAddOrEdit.vue'

export default Vue.extend({
  components: { sectionAddOrEdit },
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      dialogVisible: true,
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created () {
    this.loadSections()
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    handleNodeClick (data: any) {
      console.log(data)
    },
    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      // draggingNode 拖动的节点
      // dropNode 放置的目标节点
      // type: 'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort (dragNode: any, dropNode: any, type: any, event: any) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (error) {
        console.log(error)
        this.$message.error('排序失败')
      }
    }
  }
})
</script>

<style lang='scss' scoped>
.inner {
 display: flex;
 padding: 10px 5px;
 flex: 1;
 justify-content: space-between;
 align-items: center;
 border-bottom: 1px solid #ebebf5;
}
::v-deep .el-tree-node__content{
  height: auto;
}
</style>
