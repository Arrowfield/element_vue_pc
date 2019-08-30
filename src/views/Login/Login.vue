<template>
  <div class="login">
    <video autoplay muted loop>
      <source src="../../assets/media/riverside.mp4" type="video/mp4">
      您的浏览器不支持 video 标签
    </video>
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

<style lang="scss">
  @import "Login.scss";
</style>
