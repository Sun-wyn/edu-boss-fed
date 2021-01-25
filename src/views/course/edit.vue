<template>
  <div class="course-edit">
   <create-or-update
    is-edit
    :course-id='courseId'
  ></create-or-update>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'
export default Vue.extend({
  name: 'CourseEdit',
  components: { CreateOrUpdate },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang='scss' scoped>
.el-step {
  cursor: pointer;
}
</style>
