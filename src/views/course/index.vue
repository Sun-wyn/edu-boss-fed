<template>
  <div class="course">
    <list></list>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import List from './components/List.vue'

export default Vue.extend({
  components: { List },
  name: 'CourseIndex'
})
</script>

<style lang='scss' scoped>

</style>
