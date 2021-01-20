<template>
  <div class="alloc-resource">
    <el-card>
      <div slot="header">
        <span>分配菜单</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="menus"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        :default-expand-keys='checkedKeys'
      ></el-tree>
      <div style="text-align: center;padding:10px;">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getAllResource, getRoleResources, allocateRoleResources } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocResource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  async created () {
    await this.loadResource()
    this.loadRoleResources()
  },
  methods: {
    async loadResource () {
      const ret = await Promise.all([getAllResource(), getResourceCategories()])
      const resources = ret[0].data.data
      const resourceCategories = ret[1].data.data

      resources.forEach((r: any) => {
        const category = resourceCategories.find((c: any) => c.id === r.categoryId)
        if (category) {
          category.children = category.children || []
          category.children.push(r)
        }
      })
      // 修改顶层分类 ID: 因为分类 ID 和资源 ID 冲突
      resourceCategories.forEach((item: any) => {
        item.id = Math.random()
      })
      this.menus = resourceCategories
    },
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      this.getCheckedResources(data.data)
    },
    getCheckedResources (resource: any) {
      resource.forEach((r: any) => {
        r.resourceList && r.resourceList.forEach((c: any) => {
          if (c.selected) {
            this.checkedKeys = [...this.checkedKeys, c.id] as any
          }
        })
      })
    },
    async onSave () {
      const checkedNodes = (this.$refs['menu-tree'] as Tree).getCheckedNodes()
      const resourceIdList: number[] = []
      checkedNodes.forEach((c: any) => {
        if (!c.children) {
          resourceIdList.push(c.id)
        }
      })
      await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang='scss' scoped>
.item{
  margin: 20px;
  border-left:1px solid #dcdfe6;
  border-right:1px solid #dcdfe6;
  border-bottom:1px solid #dcdfe6;
  .title{
    padding: 20px;
    background: rgb(242, 246, 252);
    border-top:1px solid #dcdfe6;
    border-bottom:1px solid #dcdfe6;
  }
  .list{
    padding:20px;
    .checkSpan{
      display: inline-block;
      width: 29%;
    }
  }
}
</style>
