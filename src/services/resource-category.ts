/**
 * 资源分类相关请求模块
 */
import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'get',
    url: '/boss/resource/category/getAll'
  })
}

export const saveOrderUpdate = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const delCategory = (id: string | number) => {
  return request({
    method: 'delete',
    url: `boss/resource/category/${id}`
  })
}
