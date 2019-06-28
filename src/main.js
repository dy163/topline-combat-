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

import { getUser, removeUser } from '@/utils/auth'

// 配置axios 的基础路径
// 直接请求登录的时候 直接axios({url:/.......})
// 线上连接
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 本地连接
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'

/**
 * Axios 请求拦截器：axios 发出去的请求会先经过这里
 * config 是本次请求相关的配置对象
 */
axios.interceptors.request.use(config => {
  const user = getUser()

  // 如果有 user 数据，则往本次请求中添加用户 token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // return config 是允许请求发送的开关
  // 我们可以在这之前进行一些业务逻辑操作
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * Axios 响应拦截器：axios 收到的响应会先经过这里
 */

axios.interceptors.response.use(response => { // >= 200 或 < 400 的状态码进入这里
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => { // >= 400 近这里
  if (error.response.status === 401) {
    // 清除本地存储中无效的用户 token 信息
    removeUser()
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

// 定义全局的em ui

Vue.use(ElementUI)
// 所有组件都是vue实例---可以把一些需要频繁调用的组件中的成员放入到vue的实例中
// 给原型对象扩展成员的时候最好加上一个$前缀,避免和组件中的成员名字产生冲突
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
