<template>
  <div class="createOrEdit">
    <el-dialog
      title="提示"
      :visible.sync="visiable"
      width="30%"
      :before-close="handleClose">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditPage',
  props: {
    visiable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      resourceCategories: [], // 资源分类列表
      form: {
        name: '',
        url: '',
        categoryId: null
      },
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadgResourceCategories()
  },
  methods: {
    async loadgResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    handleClose () {
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 visiable 变量
      this.$emit('update:visiable', false)
    },
    onSubmit () {
      this.$emit('update:visiable', false)
    },
    onRest () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
