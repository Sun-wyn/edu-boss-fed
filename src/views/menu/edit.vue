<template>
  <div class="role">
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  components: { CreateOrEdit },
  name: 'MenuCreate',
  data () {
    return {
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
