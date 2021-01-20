<template>
  <div class="resourceCategory">
    <el-card class="box-card">
      <div slot="header">
        <el-button size="small" @click="showDialogAdd">添加</el-button>
      </div>
      <el-table
          :data="categoryList"
          border
          height='calc( 100vh - 204px)'
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
            label="名称"
            align="center"
            min-width='150'>
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="创建时间"
            align="center"
            min-width='150'>
            <template slot-scope="scope">
              {{formatDate(scope.row.createdTime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            min-width='150'>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog
      v-if="dialogVisible"
      :title="isEdit ? '编辑':'添加'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form size="small" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="onSubmit" type="primary">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getUserPermissions } from '@/services/permission'
import { getResourceCategories, saveOrderUpdate, delCategory } from '@/services/resource-category'

export default Vue.extend({
  name: 'ResourceCategory',
  data () {
    return {
      isLoading: true,
      categoryList: [],
      dialogVisible: false,
      form: {
        name: '',
        sort: 0
      },
      isEdit: false
    }
  },
  created () {
    this.loadUserPermissions()
    this.loadAll()
  },
  methods: {
    async loadUserPermissions () {
      await getUserPermissions()
    },
    async loadAll () {
      const { data } = await getResourceCategories()
      this.isLoading = false
      this.categoryList = data.data
    },
    async handleEdit (row: any) {
      this.form = row
      this.isEdit = true
      this.dialogVisible = true
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await delCategory(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAll() // 更新数据列表
          }
        })
        .catch(() => { // 取消删除
          this.$message.info('已取消删除')
        })
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 日期格式化
    formatDate (str: string) {
      const arr = str.split('T')
      const time = arr[1].split('.')[0]
      return arr[0] + ' ' + time
    },
    showDialogAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    async onSubmit () {
      await saveOrderUpdate(this.form)
      this.dialogVisible = false
      this.loadAll()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
