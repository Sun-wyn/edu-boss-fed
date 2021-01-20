<template>
  <div class="user">
    <user-list></user-list>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import UserList from './UserList.vue'

export default Vue.extend({
  components: { UserList },
  name: 'UserIndex'
})
</script>

<style lang='scss' scoped>

</style>
