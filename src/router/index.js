import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./views/login')
    }, // 用户登陆
    {
      component: () => import('./views/article')
    }, // 文章管理
    {
      component: () => import('./views/publish')
    }, // 头条发布
    {
      component: () => import('./views/publish/:articleId')
    }, // 修改头条发布
    {
      component: () => import('./views/comment')
    }
  ]
})
