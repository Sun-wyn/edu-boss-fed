<template>
  <div class="createOrEdit">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        :rules="rules"
        class="demo-form-inline"
        size="small"
      >
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
        <el-form-item label="资源描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="资源描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="$emit('cancel')">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import { saveOrUpdate, getResourceById } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditPage',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      resourceCategories: [], // 资源分类列表
      form: {
        id: '',
        name: '',
        categoryId: 1,
        url: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择资源分类', trigger: 'blur' }
        ]
      },
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadgResourceCategories()
    if (this.isEdit) {
      this.loadResourceById()
    }
  },
  methods: {
    async loadResourceById () {
      const { data } = await getResourceById(this.id)
      this.form = data.data
    },
    async loadgResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        await saveOrUpdate(this.form)
        this.$message.success('操作成功')
        this.$emit('success')
      } catch (error) {
        console.log(error)
      }
    },
    onRest () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
