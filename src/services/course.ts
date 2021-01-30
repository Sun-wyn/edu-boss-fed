/**
 * 课程相关请求模块
 */
import request from '@/utils/request'

export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const uploadCourseImage = (data: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) => {
  // 该接口要求的请求数据类型： multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'post',
    url: '/boss/course/upload',
    data,
    // h5 新增的上传响应事件
    onUploadProgress
  })
}

export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'get',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

export const getQueryCourses = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (data: any) => {
  return request({
    method: 'get',
    url: '/boss/course/changeState',
    params: data
  })
}
