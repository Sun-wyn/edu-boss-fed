<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
        <el-form inline>
          <el-form-item label="课程名称">
            <el-input v-model="params.courseName"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="params.status" placeholder="请选择">
              <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" @click="$router.push({
              name: 'course-create'
            })">添加课程</el-button>
          </el-form-item>
        </el-form>
      </div>
       <el-table
          :data="courseList"
          border
          style="width: 100%">
          <el-table-column
            label="ID"
            align="center"
            prop="id"
            width="60">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="价格">
            <template slot-scope="scope">
              {{`￥${scope.row.price}`}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sortNum"
            align="center"
            label="排序">
          </el-table-column>
          <el-table-column
            align="center"
            label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="handleSwitchChange(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="activeNum"
                :inactive-value="inactiveNum">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })">编辑课程</el-button>
              <el-button @click="$router.push({
                name: 'course-section',
                params: {
                  courseId: scope.row.id
                },
                query: {
                  courseName: scope.row.courseName
                }
              })">内容管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px;margin-bottom:10px;"
          background
          :disabled="isLoading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="params.currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      statusList: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '上架'
      }, {
        value: '0',
        label: '下架'
      }],
      courseList: [],
      params: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      totalCount: 0,
      isLoading: false,
      activeNum: 1,
      inactiveNum: 0
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      const { data } = await getQueryCourses(this.params)
      this.courseList = data.data.records
      this.totalCount = data.data.total
    },
    handleSizeChange (val: number) {
      this.params.pageSize = val
      this.params.currentPage = 1 // 每页大小改变更新查询第1页数据
      this.loadCourses()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.params.currentPage = val // 修改要查询的页码
      this.loadCourses()
    },
    handleSearch () {
      this.params.currentPage = 1 // 每页大小改变更新查询第1页数据
      this.loadCourses()
    },
    async handleSwitchChange (row: any) {
      await changeState({
        courseId: row.id,
        status: row.status
      })
      this.$message.success('操作成功')
      this.loadCourses()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
