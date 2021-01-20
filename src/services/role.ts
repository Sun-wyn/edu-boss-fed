/**
 * 角色相关请求模块
 */
import request from '@/utils/request'

export const createOrUpdate = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getRolePages = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/role/getRolePages',
    data
  })
}

export const getRoleById = (id: string | number) => {
  return request({
    method: 'get',
    url: `/boss/role/${id}`
  })
}

export const delRoleById = (id: string | number) => {
  return request({
    method: 'delete',
    url: `/boss/role/${id}`
  })
}

export const getAllRole = () => {
  return request({
    method: 'get',
    url: '/boss/role/all'
  })
}

export const allocateUserRoles = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

export const getUserRoles = (id: string | number) => {
  return request({
    method: 'get',
    url: `/boss/role/user/${id}`
  })
}
