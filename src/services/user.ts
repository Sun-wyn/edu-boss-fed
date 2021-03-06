/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'

interface User {
  phone: string;
  password: string;
}

export const login = (data: User) => {
  return request({
    method: 'post',
    url: '/front/user/login',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // },
    // 如果 data 是普通对象，则 Content-Type 是 application/json
    // 如果 data 是 qs.stringif(data) 转换之后的数据：key=value&key=value，
    // 则 Content-Type 会被设置成 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象，则 Content-Type 是 multipart/form-data
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}
