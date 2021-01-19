<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create'})">添加菜单</el-button>
      </div>
      <div class="tableContainer">
        <el-table
          :data="menus"
          height='calc( 100vh - 180px)'
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="编号"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="菜单名称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="level"
            align="center"
            label="菜单级数">
          </el-table-column>
          <el-table-column
            prop="icon"
            align="center"
            label="前端图标">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            align="center"
            label="排序">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: [], // 菜单列表
      page: {
        current: 1,
        size: 10
      },
      totalCount: 0 // 所有条数
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await deleteMenu(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus() // 更新数据列表
          }
        })
        .catch(() => { // 取消删除
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang='scss' scoped>
.tableContainer{
  // height: calc( 100vh - 200px);
  // overflow: auto;
}
</style>
