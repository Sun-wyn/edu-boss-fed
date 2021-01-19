<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" size="small">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="资源分类">
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading" type="primary" @click="onSubmit">查询搜索</el-button>
            <el-button :disabled="isLoading" @click="onRest" >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns">
        <el-button size='small' @click="showDialog">添加</el-button>
        <el-button size='small' @click="$router.push({
        name: 'resource-category'
      })">资源分类</el-button>
      </div>
      <div class="tableContainer">
        <el-table
          :data="resources"
          border
          height='calc( 100vh - 294px)'
          v-loading='isLoading'
          style="width: 100%">
          <el-table-column
            label="编号"
            type="index"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源名称"
            align="center"
            min-width='150'>
          </el-table-column>
          <el-table-column
            prop="url"
            label="资源路径"
            align="center"
            min-width='150'>
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
              <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageContainer">
        <el-pagination
          background
          :disabled="isLoading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      :title="isEdit ? '编辑资源':'添加资源'"
      :visible.sync="dialogVisiable"
      width="30%"
      :before-close="handleClose">
      <create-or-edit
        v-if='dialogVisiable'
        :id='resourceId'
        :is-edit='isEdit'
        @success='onSuccess'
        @cancel='dialogVisiable=false'
      ></create-or-edit>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getResourcePages, delResourceById } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'ResourceList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      resources: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1, // 默认查询第1页数据
        size: 10 // 每页大小
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
      isEdit: false,
      dialogVisiable: false,
      resourceId: ''
    }
  },
  created () {
    this.loadResources()
    this.loadgResourceCategories()
  },
  methods: {
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变更新查询第1页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },
    async loadgResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true // 加载中
      const { data } = await getResourcePages(this.form)
      this.isLoading = false
      this.resources = data.data.records
      this.totalCount = data.data.total
    },
    handleEdit (row: any) {
      this.isEdit = true
      this.resourceId = row.id
      this.dialogVisiable = true
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => { // 确认执行这里
          // 请求删除操作
          const { data } = await delResourceById(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadResources() // 更新数据列表
          }
        })
        .catch(() => { // 取消删除
          this.$message.info('已取消删除')
        })
    },
    onRest () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    // 日期格式化
    formatDate (str: string) {
      const arr = str.split('T')
      const time = arr[1].split('.')[0]
      return arr[0] + ' ' + time
    },
    handleClose () {
      this.dialogVisiable = false
    },
    onSuccess () {
      this.dialogVisiable = false
    },
    showDialog () {
      this.dialogVisiable = true
      this.isEdit = false
    }
  }
})
</script>

<style lang='scss' scoped>
.tableContainer{
  // height: calc( 100vh - 254px);
  // overflow: auto;
}
.pageContainer{
  padding:10px;
}
.btns{
  padding:10px 20px;
}
</style>
