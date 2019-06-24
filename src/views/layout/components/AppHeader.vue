<template>
  <el-row :gutter="20">
    <el-col :span="10">江苏传智博客教育科技有限股份公司</el-col>
    <el-col :span="5" :offset="9">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img width="30px" :src="userInfo.photo" >
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-col, .el-dropdown-link {
  height: 60px;
  display: flex;
  align-items: center;
}
// .el-dropdown-link {
//   display: flex;
//   align-items: center;
// }
</style>
