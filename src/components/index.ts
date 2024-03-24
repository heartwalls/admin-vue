import SvgIcon from './svgicon/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon }
// 对外暴露插件
export default {
  // 必须叫install
  install(app: App) {
    // 注册项目中的所有全局组件
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
