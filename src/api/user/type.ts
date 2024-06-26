// 登录接口需要携带的参数类型
export interface loginForm {
  username: string
  password: string
  captcha: string
  codeKey: string
}

interface dataType {
  // ? 表示可选
  token?: string
  message?: string
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

// 请求响应数据
export interface userResponseData {
  code: number
  data: user
}
