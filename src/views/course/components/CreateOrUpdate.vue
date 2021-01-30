<template>
  <div class="create-or-update">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, idx) in steps"
            :key="idx"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = idx"
          ></el-step>
        </el-steps>
      </div>
      <div style="padding: 20px">
        <el-form ref="form" label-width="80px" :model="course" :rules="courseRules">
          <div v-show="activeStep === 0">
            <el-form-item label="课程名称" prop="courseName">
              <el-input v-model="course.courseName"></el-input>
            </el-form-item>
            <el-form-item label="课程简介" prop="brief">
              <el-input v-model="course.brief"></el-input>
            </el-form-item>
            <el-form-item label="课程概述" prop="previewFirstField">
              <el-input
                style="margin-bottom: 10px"
                type="textarea"
                v-model="course.previewFirstField"
                placeholder="概述1"
              ></el-input>
            </el-form-item>
            <el-form-item label="课程姓名" prop="previewSecondField">
              <el-input
                type="textarea"
                v-model="course.previewSecondField"
                placeholder="概述2"
              ></el-input>
            </el-form-item>
            <el-form-item label="讲师姓名" prop="teacherDTO.teacherName">
              <el-input v-model="course.teacherDTO.teacherName"></el-input>
            </el-form-item>
            <el-form-item label="讲师简介" prop="teacherDTO.description">
              <el-input v-model="course.teacherDTO.description"></el-input>
            </el-form-item>
            <el-form-item label="课程排序" prop="sortNum">
              <el-input-number v-model="course.sortNum"></el-input-number>
            </el-form-item>
          </div>
          <div v-show="activeStep === 1">
            <el-form-item label="课程封面">
              <!--
                1. 组件需要根据绑定的数据进行图片预览
                2. 组件需要把上传成功的图片地址同步到绑定的数据
                v-model 的本质还是父子组件通信
                  1. 它会给子组件传递一个名字叫 value  的数据（props）
                  2. 默认监听 input 事件， 修改绑定的数据（自定义事件）
                -->
              <course-image v-model="course.courseListImg" :limit="5"></course-image>
            </el-form-item>
            <el-form-item label="介绍封面">
              <course-image v-model="course.courseImgUrl"></course-image>
            </el-form-item>
          </div>
          <div v-show="activeStep === 2">
            <el-form-item label="售卖价格"  prop="discounts">
              <el-input v-model="course.discounts">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品原价">
              <el-input v-model="course.price">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="销量">
              <el-input v-model="course.sales">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="活动标签">
              <el-input v-model="course.discountsTag"> </el-input>
            </el-form-item>
          </div>
          <div v-show="activeStep === 3">
            <el-form-item label="限时秒杀开关">
              <el-switch
                v-model="isSeckill"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
            <template v-if="isSeckill">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="course.activityCourseDTO.beginTime"
                  type="date"
                  value-format="yyyy-mm-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="course.activityCourseDTO.endTime"
                  type="date"
                  value-format="yyyy-mm-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="秒杀价">
                <el-input v-model="course.activityCourseDTO.amount">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="秒杀库存">
                <el-input v-model="course.activityCourseDTO.stock">
                  <template slot="append">个</template>
                </el-input>
              </el-form-item>
            </template>
          </div>
          <div v-show="activeStep === 4">
            <el-form-item label="课程详情">
              <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
            </el-form-item>
            <el-form-item label="是否发布">
              <el-switch
                v-model="course.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存</el-button>
            </el-form-item>
          </div>
          <el-form-item v-if="activeStep >= 0 && activeStep < 4">
            <el-button @click="activeStep++">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'
import moment from 'moment'
import { Form } from 'element-ui'

export default Vue.extend({
  components: { CourseImage, TextEditor },
  name: 'CreateOrUpdate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '销售信息', icon: 'el-icon-edit' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' }
      ],
      imageUrl: '',
      isSeckill: true,
      value1: '',
      value2: '',
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: '',
        discounts: '',
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: '',
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0 未发布，1 已发布
        sales: '',
        activityCourse: true,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: '',
          stock: ''
        },
        autoOnlineTime: ''
      },
      courseRules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入课程简介', trigger: 'blur' }
        ],
        previewFirstField: [
          { required: true, message: '请输入课程概述', trigger: 'blur' }
        ],
        previewSecondField: [
          { required: true, message: '请输入课程姓名', trigger: 'blur' }
        ],
        teacherDTO: {
          teacherName: [
            { required: true, message: '请输入讲师姓名', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入讲师简介', trigger: 'blur' }
          ]
        },
        sortNum: [
          { required: true, message: '请输入课程排序', trigger: 'blur' }
        ],
        discounts: [
          { required: true, message: '请输入售卖价格', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.data.activityCourseDTO) {
        const { activityCourseDTO } = data.data
        activityCourseDTO.beginTime = moment(activityCourseDTO.beginTime).format('yyyy-mm-dd')
        activityCourseDTO.endTime = moment(activityCourseDTO.endTime).format('yyyy-mm-dd')
      }
      this.course = data.data
    },
    async handleSave () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateCourse(this.course)
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style lang='scss' scoped>
.el-step {
  cursor: pointer;
}
</style>
