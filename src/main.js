import Vue from 'vue'
import App from './App.vue'

// 先找文件，没有就找目录
// 如果找到目录，优先加载目录中的 index
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/nprogress/nprogress.css'

import axios from 'axios'

// 引入公共样式,最好在在element样式文件之后,可以自定义修改element内置样式
import './styles/index.less'
// 定义全局的em ui

// 配置axios 的基础路径
// 直接请求登录的时候 直接axios({url:/.......})
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.use(ElementUI)
// 所有组件都是vue实例---可以把一些需要频繁调用的组件中的成员放入到vue的实例中
// 给原型对象扩展成员的时候最好加上一个$前缀,避免和组件中的成员名字产生冲突
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
