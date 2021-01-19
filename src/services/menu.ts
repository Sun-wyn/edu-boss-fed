/**
 * 菜单相关请求模块
 */
import request from '@/utils/request'

export const createOrUpdateMenu = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'get',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'get',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'delete',
    url: `/boss/menu/${id}`
  })
}

export const getMenuNodeList = () => {
  return request({
    method: 'get',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'post',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
