<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../assets/images/logo.svg" width="100" height="100" alt="">
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-input
          placeholder="请输入用户名"
          suffix-icon="fa fa-user"
          v-model="userName"
          style="margin-bottom: 18px"
      >
      </el-input>

      <el-input
          placeholder="请输入密码"
          suffix-icon="fa fa-keyboard-o"
          v-model="password"
          type="password"
          style="margin-bottom: 18px"
          @keyup.native.enter="login"
      >
      </el-input>

      <el-button
          type="primary" :loading="loginLoading"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login"
      >登录
      </el-button>
      <div>
        <el-checkbox v-model="Remember"> 记住密码</el-checkbox>
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">注册</a>
      </div>

    </div>
  </div>
</template>

<script>
  import {setToken} from '../../utils/dataStorage'
  import {login as loginApi} from '../../api/'

  export default {
    data() {
      return {
        userName: '15118099616',
        password: '123456',
        Remember: true,
        loginLoading: false
      }
    },
    methods: {
      async login() {
        this.loginLoading = true
	      let res = await loginApi({phone:this.userName,password:this.password}).catch((err)=>{if(err) if(err) return false})
	      if(res){setToken(res.token);this.$router.push("/")}
        this.loginLoading = false
      }
    }
  }
</script>

<style lang="scss">
  @import "Login.scss";
</style>
