<template>
    <el-card>
        <div slot="header">
            <span>账户</span>
        </div>
        <el-row>
            <el-col :span="10">
                <el-form v-loading="loading">
                    <el-form-item label="媒体名称">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体简介">
                        <el-input v-model="user.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="头条号ID">
                        <el-input disabled :value="user.id"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定手机">
                        <el-input disabled :value="user.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSave">保存更新</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'AccountSettings',
  data () {
    return {
      user: {},
      loading: false
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    async loadUser () {
      this.loading = true
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/profile'
        })
        console.log(data)
        this.user = data
      } catch (err) {
        this.$message.error('账户加载失败')
      }
      this.loading = false
    },

    async handleSave () {
      try {
        const { name, intro, email } = this.user
        await this.$http({
          method: 'PATCH',
          url: '/user/profile',
          data: {
            name,
            intro,
            email
          }
        })
        this.$message({
          type: 'success',
          message: '保存数据成功'
        })
      } catch (err) {
        this.$message.error('保存失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
