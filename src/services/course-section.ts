/**
 * 课程章节相关请求模块
 */
import request from '@/utils/request'

export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'get',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
export const saveOrUpdateSection = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}
