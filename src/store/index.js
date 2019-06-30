/**
 * 我们把不好交互进行组件通信交互的组件放到store中
 * 使用从这里开始
 * 修改也要从这里开始
 * 这里的数据和其他任何组件都没有关系
 * 这里的数据任何组件豆科鱼访问和修改
 * 而且这里的数据也是响应式的,数据的改变也会影响组件的试图的更新
 */

import Vue from 'vue'
import Vuex from 'vuex'

import { getUser, saveUser } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state中的数据任何组件都可以访问
  state: {
    user: getUser() || {} // user的初始数据来自于本地存储
  },
  mutations: {
    changeUser (state, user) {
      // 对象拷贝
      Object.assign(state.user, user)

      // 同步更新本地数据信息
      saveUser(state.user)
    }
  }
})

export default store
