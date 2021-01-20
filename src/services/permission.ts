/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const getUserPermissions = () => {
  return request({
    method: 'get',
    url: '/boss/permission/getUserPermissions'
  })
}
