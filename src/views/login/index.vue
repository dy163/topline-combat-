<template>
  <div class="login-wrap">
    <!-- 给组件加class,会把这个class作用的跟组件元素上 -->
    <div class="form-wrap">
      <div class="login-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <el-form ref="form" :model="form" class="form-content">
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <el-button>获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background-color: #9bbbee;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
