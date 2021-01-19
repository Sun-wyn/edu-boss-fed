<template>
  <div class="userList">
    <el-card>
      <div slot="header" class="clearfix">
        <span>筛选搜索</span>
        <div style="float:right;">
          <el-button size="small" @click="onReset">重置</el-button>
          <el-button size="small" style="margin-left:20px;" type="primary" @click="loadRolePages">查询搜索</el-button>
        </div>
        <div style="margin-top:10px;padding-left:60px;">
          <el-form ref="form" size="small" inline :model="role">
            <el-form-item label="输入搜索" prop="name">
              <el-input v-model="role.name" clearable placeholder="搜索角色名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="padding:10px 30px;">
        <el-button size="small" @click="handelAdd">添加角色</el-button>
      </div>
       <el-table
          :data="roles"
          border
          height='calc( 100vh - 294px)'
          v-loading='isLoading'
          style="width: 100%">
          <el-table-column
            label="编号"
            prop="id"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            align="center"
            min-width='100'>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            align="center"
            min-width='150'>
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="添加时间"
            align="center"
            min-width='150'>
            <template slot-scope="scope">
              {{formatDate(scope.row.createdTime)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <div>
                <el-button size="small" type="text" @click="$router.push({
                  name:'alloc-menu',
                  params:{
                    roleId:scope.row.id
                  }
                })">分配菜单</el-button>
                <el-button size="small" type="text" @click="handleDelete(scope.row)">分配资源</el-button>
              </div>
              <div>
                <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :disabled="isLoading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="role.current"
          :page-sizes="[5, 10, 20]"
          :page-size="role.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
    </el-card>
    <el-dialog
        :title="isEdit ? '编辑角色':'添加角色'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <create-or-edit
          v-if='dialogVisible'
          :is-edit='isEdit'
          :roleId='roleId'
          @success='onSuccess'
          @cancel='dialogVisible = false'
        ></create-or-edit>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import CreateOrEdit from './CreateOrEdit.vue'
import { getRolePages, delRoleById } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'UserList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      dialogVisible: false,
      roleId: null, // 编辑角色的 id
      isEdit: false,
      role: {
        code: '',
        id: '',
        name: '',
        startCreateTime: '',
        endCreateTime: '',
        current: 1,
        size: 10
      },
      totalCount: 0,
      isLoading: true,
      roles: []
    }
  },
  created () {
    this.loadRolePages()
  },
  methods: {
    async loadRolePages () {
      const { data } = await getRolePages(this.role)
      this.isLoading = false
      this.roles = data.data.records
      this.totalCount = data.data.total
    },
    handleClose () {
      this.dialogVisible = false
    },
    onSuccess () {
      this.loadRolePages()
      this.dialogVisible = false // 关闭对话框
    },
    handelAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    handleEdit (row: any) {
      this.roleId = row.id
      this.isEdit = true
      this.dialogVisible = true
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await delRoleById(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRolePages() // 更新数据列表
          }
        })
        .catch(() => { // 取消删除
          this.$message.info('已取消删除')
        })
    },
    // 日期格式化
    formatDate (str: string) {
      const arr = str.split('T')
      const time = arr[1].split('.')[0]
      return arr[0] + ' ' + time
    },
    handleSizeChange (val: number) {
      this.role.size = val
      this.role.current = 1 // 每页大小改变更新查询第1页数据
      this.loadRolePages()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.role.current = val // 修改要查询的页码
      this.loadRolePages()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
