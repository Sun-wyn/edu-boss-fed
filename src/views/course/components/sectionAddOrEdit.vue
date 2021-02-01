<template>
  <div class="section-add-edit">
    <el-form label-width="100px" :model="form" style="width: 90%;">
      <el-form-item label="课程名称">
        <el-input disabled v-model="form.courseName"></el-input>
      </el-form-item>
      <el-form-item label="章节名称" v-if="!isSection">
        <el-input v-model="form.sectionName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称" v-else>
        <el-input v-model="form.sectionName"></el-input>
      </el-form-item>
      <template v-if="!isSection">
        <el-form-item label="课时名称">
          <el-input v-model="form.theme"></el-input>
        </el-form-item>
        <el-form-item label="时长">
          <el-input v-model="form.duration"></el-input>
        </el-form-item>
        <el-form-item label="是否开放试听">
          <el-switch
            v-model="form.isFree"
            :active-value="true"
            :inactive-value="false"
            active-color="#40586f"
            inactive-color="#dcdfe6">
          </el-switch>
        </el-form-item>
      </template>

      <el-form-item label="章节描述" v-if="isSection && isEdit">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="form.orderNum"></el-input-number>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="onSave">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { saveOrUpdateSection } from '@/services/course-section'

export default Vue.extend({
  name: 'SectionAddOrEdit',
  props: {
    courseId: {
      type: [String, Number]
    },
    courseName: {
      type: String
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    listCon: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isSection: {
      type: Boolean,
      default: true
    },
    sectionName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        courseId: this.courseId,
        courseName: this.courseName,
        description: '',
        orderNum: '',
        sectionName: ''
      },
      value: ''
    }
  },
  created () {
    if (this.isEdit) {
      this.form = this.listCon
      this.form.courseId = this.courseId
      this.form.courseName = this.courseName
    }
    if (!this.isSection) {
      this.form.sectionName = this.sectionName
    }
  },
  methods: {
    async onSave () {
      await saveOrUpdateSection(this.form)
      this.$emit('success')
    },
    cancle () {
      this.$emit('cancel')
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
