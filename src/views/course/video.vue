<template>
  <div class="course-video">
    <el-card>
      <div style="padding: 20px;">
        <el-form label-width="120px">
          <el-form-item label="课程:">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="阶段:">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课时:">
            <el-input></el-input>
          </el-form-item>
          <hr>
          <el-form-item label="视频上传">
            <input ref="video-file" type="file">
          </el-form-item>
          <el-form-item label="封面上传">
            <input ref='image-file' type="file">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpload">开始上传</el-button>
            <el-button>返回</el-button>
          </el-form-item>
          <el-form-item>
            <p>视频上传中：{{uploadPercent}}</p>
            <p v-if="isUploadSuccess">视频转码中：{{isTransCodeSuccess ? '完成': '正在处理，请稍后'}}</p>

          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  aliyunTransCode,
  getAliyunTransCodePercent
} from '@/services/aliyu-upload'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      uploader: null,
      imageURL: '',
      videoId: null,
      uploadPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false
    }
  },
  created () {
    this.initUploader()
  },
  computed: {
    video () {
      return this.$refs['video-file']
    },
    image () {
      return this.$refs['image-file']
    }
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: '1303984639806000',
        // 添加文件成功
        addFileSuccess: function (uploadInfo: any) {
          console.log('addFileSuccess: ' + uploadInfo.file.name)
        },
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadStarted:' + uploadInfo.file.name)
          // 1. 通过我们的后端获取文件上传凭证
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            // 获取图片上传作证
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            uploadAddressAndAuth = data.data
            this.imageURL = data.data.imageURL
          } else {
            // 获取视频上传凭证
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageURL
            })
            uploadAddressAndAuth = data.data
            this.videoId = uploadAddressAndAuth.videoId
          }
          ;(this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed: ' + uploadInfo.file.name)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed: file:' + uploadInfo.file.name)
        },

        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: (uploadInfo: any, totalSize: any, progress: any) => {
          console.log('onUploadProgress:file:' + uploadInfo.file.name)
          // const progressPercent = Math.ceil(progress * 100)
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(progress * 100)
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('upload expired and resume upload with uploadauth ')
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          this.isUploadSuccess = true
          console.log('onUploadEnd: uploaded all the files')
          // 请求转码
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageURL,
            fileName: (this.video as any).files[0].name,
            fileId: this.videoId
          })
          // 轮询查询转码进度
          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            if (data.data === 100) {
              this.isTransCodeSuccess = true
              window.clearInterval(timer)
              console.log('转码成功')
            }
          }, 3000)
        }
      })
    },
    handleUpload () {
      this.isTransCodeSuccess = false
      this.isUploadSuccess = false
      this.uploadPercent = 0
      console.log(this.video)
      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      const uploader = this.uploader as any
      uploader.addFile(imageFile, null, null, '{"Vod":{}}')
      uploader.addFile(videoFile, null, null, '{"Vod":{}}')
      // 开始上传
      uploader.startUpload()
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
