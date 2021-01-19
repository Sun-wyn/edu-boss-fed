<template>
  <div class="role">
    <list/>
    <!-- <alloc-menu></alloc-menu> -->
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
// import AllocMenu from './alloc-menu.vue'
import List from './components/List.vue'

export default Vue.extend({
  components: { List },
  name: 'RoleIndex'
})
</script>

<style lang='scss' scoped>

</style>
