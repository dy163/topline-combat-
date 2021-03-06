<template>
  <div class="login-wrap">
    <!-- 给组件加class,会把这个class作用的跟组件元素上 -->
    <div class="form-wrap">
      <div class="login-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <el-form ref="form" :rules="rules" :model="form" class="form-content">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <el-button
              @click="handleSendCode"
              :disabled="!!codeTimer"
              :loading="codeLoading">
              {{ codeTimer ? `剩余${codeTimeSeconds}秒` : '获取验证码' }}
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox class="agree-checkbox" v-model="form.agree"></el-checkbox>
          <span class="agree-text">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          class="btn-login"
          @click="handleLogin"
          :loading="loadingLogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// 引入第三方的服务jt.js这个服务没有提供前端的npm包 需要手动下载,之后需要进行设置忽略eslint的校验(.eslintignore)的配置文件
// import '@/vendor/gt.js'
import { saveUser } from '@/utils/auth.js' // 按需加载,,模块中就是他这个成员
import initGeetest from '@/utils/init-geetest'
const initCodeTimeSeconds = 60

export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { len: 11, message: '长度必须为11位', trigger: 'blur' }
          { pattern: /^\d{11}$/, message: '长度必须为11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // { len: 6, message: '长度必须为6位', trigger: 'blur' }
          { pattern: /^\d{6}$/, message: '请输入有效的验证码', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      },
      codeTimer: null, // 倒计时定时器
      codeTimeSeconds: initCodeTimeSeconds, // 定时器事件
      loadingLogin: false,
      codeLoading: false
    }
  },

  methods: {
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过
        this.submitLogin()
      })
    },

    async submitLogin () {
      this.loadingLogin = true
      try {
        const userInfo = await this.$http({
          method: 'POST',
          url: '/authorizations',
          data: this.form
        })
        // console.log(res.data)
        // const userInfo = res.data.data

        // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
        saveUser(userInfo) // 直接调这个方法
        // 重新加载 userInfo
        this.$store.commit('changeUser', userInfo)

        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$message.error('登录失败,手机号或验证码错误')
      }
      this.loadingLogin = false
    },

    handleSendCode () {
      // 验证手机号是否有效validateField 对单个字段的验证
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          // trim是input的特性,判断input的空格
          return
        }
        // 调这个函数表示在点击登陆按钮的时候需要在一次验证,这是对单个表单的进行验证
        this.showGeetest()
      })
    },

    async showGeetest () {
      try {
        // 验证码禁用和开启
        this.codeLoading = true
        const { mobile } = this.form
        const data = await this.$http({
          method: 'GET',
          url: `/captchas/${mobile}`
        })
        // console.log(res.data)
        // const { data } = res.data

        const captchaObj = await initGeetest(
          {
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          })
        captchaObj.onReady(() => {
          this.codeLoading = false
          // 验证码ready之后才能调用verify方法显示验证码
          captchaObj.verify() // 弹出验证码内容框
        })
          .onSuccess(async () => {
            try {
            // your code
              const {
                geetest_challenge: challenge,
                geetest_seccode: seccode,
                geetest_validate: validate
              } = captchaObj.getValidate()
              // 发送短信
              await this.$http({
                method: 'GET',
                url: `/sms/codes/${mobile}`,
                params: {
                  challenge,
                  validate,
                  seccode
                }
              })
              // 开始倒计时
              // console.log(res.data)
              this.codeCountDown()
            } catch (err) {
              this.$message.error('获取验证码失败')
              this.codeLoading = false
            }
          })
      // 在这里注册"发送验证码",按钮的的点击事件,然后验证用户是否输入手机号以及手机号的格式是否正确,没有问题:
      // capchaObj.verify
      } catch (err) {
        this.$message.error('获取验证码失败')
        this.codeLoading = false
      }
    },

    // 定时器函数
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          // 清除定时器
          window.clearInterval(this.codeTimer)
          // 定时器回到初始状态
          this.codeTimeSeconds = initCodeTimeSeconds
          // 回到初始重新为空
          this.codeTimer = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  // background-color: #9bbbee;
  background-image: url(./一封信.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-head {
    display: flex;
    justify-content: center;
    align-items: center; // 居中对齐弹性盒子的各项
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    background-color: #c183fb;
    padding: 20px;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
