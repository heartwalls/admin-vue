import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type.ts'

// 统一接口管理
enum API {
  LOGIN_URL = '/admin/system/user/login', // /user/login
  VERIFY_CODE_URL = '/admin/system/user/getCode',
  USERINFO_URL = '/user/info',
}
// 暴露请求函数
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const getVerifyCode = () => {
  return request.get<any, any>(API.VERIFY_CODE_URL)
}
export const userInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
