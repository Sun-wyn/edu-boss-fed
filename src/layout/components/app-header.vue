<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="30" :src="userInfo.portrait || squareUrl"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      userInfo: {} // 当前用户登录信息
    }
  },
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除登录状态
        this.$store.commit('setUser', null)
        // 返回登录页
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
})
</script>

<style lang='scss' scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
