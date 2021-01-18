<template>
  <div class="resource">
    <resource-list></resource-list>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import ResourceList from './components/List.vue'

export default Vue.extend({
  components: { ResourceList },
  name: 'ResourceIndex'
})
</script>

<style lang='scss' scoped>

</style>
