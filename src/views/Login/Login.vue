<template>
    <div class="login">
        <!-- <video autoplay muted loop>
          <source src="../../assets/media/riverside.mp4" type="video/mp4">
          您的浏览器不支持 video 标签
        </video> -->
        <div class="login-panel">
            <!-- <fl-button>123</fl-button> -->
            <fl-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" :size="100">
            </fl-avatar>
            <p class="login-notice" style="line-height:26px;">用户名:admin 密码:123456</p>
            <fl-input style="margin:15px 0" icon="user" placeholder="用户名" type="text" v-model="user"></fl-input>
            <fl-input icon="lock" placeholder="密码" type="password" v-model="upwd"></fl-input>
            <fl-checkbox v-model="checked" style="margin-top:15px"></fl-checkbox>
            <fl-button @click="handleClick" style="margin-top:15px">登录</fl-button>
        </div>
    </div>
</template>

<script>
    import {
        setToken
    } from '../../utils/dataStorage'
    import {
        login as loginApi
    } from '../../api/'

    export default {
        data() {
            return {
                avatarSrc: "",
                user: "admin",
                upwd: "123456",
                checked: false
            }
        },
        methods: {
            async login() {
                this.loginLoading = true
                let res = await loginApi({
                    uname: this.userName,
                    upwd: this.password
                }).catch((err) => {
                    if (err)
                        if (err) return false
                })

                if (res.code == 200) {
                    setToken(res.token)
                    this.$router.push("/home")
                }
                this.loginLoading = false
            },
            async handleClick() {
                //console.log(this.user, this.upwd)
                //var res = await loginApi({})

                if (this.user === "admin" && this.upwd === "123456") {
                    const {
                        href
                    } = this.$router.resolve({
                        name: "dashboard"
                    })
                    window.open(href, "_blank")
                } else {
                    this.$toast({})
                }

            }
        }
    }
</script>

<style src="./Login.scss" lang="scss" scoped></style>