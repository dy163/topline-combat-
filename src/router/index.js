import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { // layout 显示app路由c出口
      // name: 'layout',  使用 js 命名的路由导航不会血染默认子路由
      path: '/',
      // 在整个项目中，模块路径中的 @ 表示的是 src 目录
      // 无论你当前模块在哪里，@ 都可以直接定位到 src
      // 加载一个目录可以默认加载它的 index.js、index.vue、index.json。。。
      // layout 显示到跟组件的路由出口
      component: () => import('@/views/layout'),
      children: [// 所有的children路由都必须都显示父路由的 router-view中
        {
          name: 'home',
          path: '', // 父路由的默认,当匹配到layout的直接默认的就是home的组件
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
