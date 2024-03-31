import { createApp } from 'vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 粒子背景
import Particles from 'particles.vue3'
// 设置全局配置国际化
//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
// 引入svg
import 'virtual:svg-icons-register'
// 引入自定义插件对象，注册全局组件
import globalComponent from './components/index'
// 引入模板全局样式
import '@/styles/index.scss'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件
app.use(globalComponent)
// 注册路由
app.use(router)
// 安装粒子背景
app.use(Particles)
// 安装仓库
app.use(store)
// 将应用挂载到挂载点
app.mount('#app')
