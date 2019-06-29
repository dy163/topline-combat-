import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth.js'

Vue.use(Router)

const router = new Router({
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
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account')
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

/*
  beforeEach 全局守卫
  当你访问页面的时候会首先进入这
  * to 要去哪里的相关数据
  * from 来自哪里的相关知识数据
  * next 允许通过的方法
*/
router.beforeEach((to, from, next) => {
  // 路由导航前,开启进度条
  nprogress.start()
  // console.log('beforeEach')
  // next()
  // console.log(to) 当前页面的信息
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
  if (to.path !== '/login') {
    if (!userInfo) {
      if (from.path === '/login') {
        // 如果是来自登录页面,是不会进行页面导航的,也就不会触发后面的afterEach钩子
        nprogress.done()
      }
      next({ path: '/login' })
    } else {
      // 登陆了允许通过
      next()
    }
  } else {
    // 没有登陆,允许通过
    if (!userInfo) {
      next()
    } else {
      // 登陆了,不允许通过
      // next(false)
      window.location.href = '/#/'
      window.location.reload()
    }
  }
})

router.afterEach((to, from) => {
  // 路由导航完成,结束进度条
  nprogress.done()
})

export default router
