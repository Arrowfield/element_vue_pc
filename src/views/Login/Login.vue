<template>
  <div class="login">
    <div class="login-panel">
      <fl-button>123</fl-button>
    </div>
  </div>
</template>

<script>
  import {setToken} from '../../utils/dataStorage'
  import {login as loginApi} from '../../api/'

  export default {
    data() {
      return {
        userName: 'admin',
        password: 'admin',
        Remember: true,
        loginLoading: false
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
