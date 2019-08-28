<template>
  <div class="login">
    <div class="login-panel">
      <!-- <fl-button>123</fl-button> -->
      <fl-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" :size="100"></fl-avatar>
      <p class="login-notice" style="line-height:26px;">用户名:admin 密码:123456</p>
      <fl-input></fl-input>
    </div>
  </div>
</template>

<script>
  import {setToken} from '../../utils/dataStorage'
  import {login as loginApi} from '../../api/'

  export default {
    data() {
      return {
        avatarSrc:""
      }
    },
    methods: {
      async login() {
        this.loginLoading = true
	      let res = await loginApi({uname:this.userName,upwd:this.password}).catch((err)=>{if(err) if(err) return false})
   
        if(res.code == 200){
          setToken(res.token)
          this.$router.push("/home")
        }
        this.loginLoading = false
      }
    }
  }
</script>

<style src="./Login.scss" lang="scss" scoped></style>
