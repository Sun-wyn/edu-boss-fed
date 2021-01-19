<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default class App extends Vue {}
</script>

<style lang="scss" scoped>
// @import '~@/styles/variables.scss';

.text{
  color: $warning-color;
}
</style>
