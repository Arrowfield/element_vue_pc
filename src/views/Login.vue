<template>
    <div class="login">
        <div class="login-panel">
            <fl-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" :size="100">
            </fl-avatar>
            <p class="login-notice" style="line-height:26px;">用户名:admin 密码:123456</p>
            <fl-input style="margin:15px 0" icon="user" placeholder="用户名" type="text" v-model="user"></fl-input>
            <fl-input icon="lock" placeholder="密码" type="password" v-model="password"></fl-input>
            <fl-checkbox v-model="checked" style="margin-top:15px"></fl-checkbox>
            <fl-button @click="handleClick" style="margin-top:15px">登录</fl-button>
        </div>
    </div>
</template>

<script>
    import {
        login as loginApi
    } from '@/api/'
    import {
        mapState
    } from 'vuex'
    export default {
        computed: {
            ...mapState({
                avatarSrc: state => state.login.avatarScr,
                user: state => state.login.user,
                password: state => state.login.password,
                checked: state => state.login.checked
            })
        },
        methods: {
            async login() {
                this.loginLoading = true
                let res = await loginApi({
                    uname: this.userName,
                    password: this.password
                })
                if (res.code !== 200) return
                setToken(res.token)
                this.$router.push("/home")
                this.loginLoading = false
            },
            handleClick() {
                if (this.user === "admin" && this.password === "123456") {
                    const {
                        href
                    } = this.$router.resolve({
                        name: "dashboard"
                    })
                    window.open(href, "_blank")
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("../assets/images/loginbg.jpg") no-repeat;
  background-size:cover;
  .login-panel{
    max-width: 400px;
    background:rgba(255,255,255, 0.2);
    border:1px solid #e3e3e3;
    padding:20px;
    text-align: center;
    border-radius: 4px;
  }
  .login-notice{
    text-align: center;
    color:white;
  }
  video{
    position: fixed;
    top:50%;
    left:50%;
    width:auto;
    height:auto;
    min-width: 100%;
    min-height:100%;
    transform: translate(-50%,-50%);
    z-index: -100;
  }
}
</style>