//用户相关的仓库
import { defineStore } from 'pinia'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { userState } from './types/state'
// 引入接口
import { reqLogin } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'

const useUserStore = defineStore('User', {
  // 存储数据的地方
  state: (): userState => {
    return {
      token: GET_TOKEN(),
    }
  },
  // 异步，逻辑处理
  actions: {
    async userLogin(data: loginForm) {
      // 登录请求
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        // token为字符串类型才保存
        this.token = result.data.token as string
        //localStorage.setItem('token', (result.data.token as string))
        SET_TOKEN(result.data.token as string)
        // 保证当前async函数执行返回一个成功的promise
        return 'success'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
