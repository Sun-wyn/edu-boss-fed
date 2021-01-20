/**
 * 资源相关请求模块
 */
import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const getResourceById = (id: string | number) => {
  return request({
    method: 'get',
    url: `/boss/resource/${id}`
  })
}

export const delResourceById = (id: string | number) => {
  return request({
    method: 'delete',
    url: `/boss/resource/${id}`
  })
}

export const getAllResource = () => {
  return request({
    method: 'get',
    url: '/boss/resource/getAll'
  })
}

export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
