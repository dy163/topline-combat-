<template>
<!--
  el-menu
  default-active  设置默认的激活项
  @open="handleOpen"
  @close="handleClose"    触发事件
  ctive-text-color  激活的文本颜色
  router 是否启用vue-router的模式,启用 该模式会在激活的导航时以index作为 path 进行路由的跳转
    el-submenu
      index   用来区分不同的导航项目必须是唯一的
 -->
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="/">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont icon-document"></i>
        <span>内容</span>
      </template>
      <el-menu-item index="/publish">
        <i class="iconfont icon-edit"></i>
        <span slot="title">发布</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont icon-icon-articles"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/comment">
      <i class="iconfont icon-comment"></i>
      <span slot="title">评论</span>
    </el-menu-item>
    <el-menu-item index="/media">
      <i class="iconfont icon-image"></i>
      <span slot="title">素材</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fensi"></i>
      <span slot="title">粉丝</span>
    </el-menu-item>
    <el-menu-item index="/account">
      <i class="iconfont icon-account"></i>
      <span slot="title">账户</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {

    }
  },

  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
