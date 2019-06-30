<template>
  <el-row :gutter="20">
    <el-col :span="10">江苏传智博客教育科技有限股份公司</el-col>
    <el-col :span="5" :offset="9">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img width="30px" :src="$store.state.user.photo">
          {{ $store.state.user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="handleLayout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { removeUser } from '@/utils/auth.js'
export default {
  name: 'AppHeader',
  data () {
    return {
      // userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    // this.userInfo = getUser()
  },
  methods: {
    handleLayout () {
      // console.log(123)
      this.$confirm('确认退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清空本地存储中的userInfo
          // window.localStorage.removeItem('user_info')
          removeUser()

          // 跳转到登录页
          this.$router.push({ name: 'login' })

          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-col,
.el-dropdown-link {
  height: 60px;
  display: flex;
  align-items: center;
}
// .el-dropdown-link {
//   display: flex;
//   align-items: center;
// }
</style>
