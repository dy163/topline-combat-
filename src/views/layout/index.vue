<template>
  <div class="layout-wrap">
    <!-- <AppAside/>
    <AppHeader/> -->
    <!-- 这里显示home 粉丝管理这些内容,在这个位置显示 -->
    <el-container>
      <el-aside width="200px">
        <AppAside/>
      </el-aside>
      <el-container>
        <el-header>
          <AppHeader/>
        </el-header>
        <el-main>
          <!-- 发布文章和文章列表在这里显示内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
import '@/styles/index.css'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #5092b8;
}

.el-header {
  background-color: #a9a3be;
}

.el-main {
  background-color: #cc89d8;
}
</style>
