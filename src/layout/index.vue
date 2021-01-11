<template>
  <el-container>
  <el-aside width="200px">
    <app-aside></app-aside>
  </el-aside>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-main>
      <!-- 子路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import appAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  components: { appAside, AppHeader },
  name: 'LayoutIndex'
})
</script>

<style lang='scss' scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}

.el-aside {
  background: #d5dce5;
}

.el-header {
  background: #fff;
}

.el-main {
  background: #eaeef2;
}

</style>
