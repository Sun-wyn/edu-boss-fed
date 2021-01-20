<template>
  <div class="user-list">
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getAllRole, allocateUserRoles, getUserRoles } from '@/services/role'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      dialogVisible: true,
      roles: [],
      roleIdList: [1, 7],
      currentUser: null // 分配角色的当前用户
    }
  },
  created () {
    this.loadAllRole()
  },
  methods: {
    async loadAllRole () {
      const { data } = await getAllRole()
      this.roles = data.data
      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      this.roleIdList = userRoles.map((item: any) => item.id)
    },
    handleClose () {
      this.dialogVisible = false
    },
    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
      console.log(data)
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
