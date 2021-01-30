<template>
  <div class="section-add-edit">
    <el-form label-width="100px" style="width: 90%;">
      <el-form-item label="课程名称">
        <el-input disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'SectionAddOrEdit'
})
</script>

<style lang='scss' scoped>

</style>
