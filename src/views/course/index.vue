<template>
  <div class="course">
    <el-button @click="$router.push({
      name: 'course-create'
    })">添加课程</el-button>
    <el-button @click="$router.push({
      name: 'course-edit',
      params: {
        courseId: 18
      }
    })">编辑课程</el-button>
    <el-button @click="$router.push({
      name: 'course-section',
      params: {
        courseId: 13
      }
    })">内容管理</el-button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseIndex'
})
</script>

<style lang='scss' scoped>

</style>
