import Vue from 'vue'
import Router from 'vue-router'
import Config from "../config/app.js"
import {isLogin} from "../utils/dataStorage"




const LoginView = () => import("../views/Login/Login.vue")



Vue.use(Router)

let RouteList = [
  {path:"/",redirect:"/login"},
  {path:"/login",name:"",component:LoginView},
  {path:"**",redirect:"/login"}//也可以定义一个路径错误的组件代替
]

const router = new Router({routes: RouteList})



router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName
  if (!isLogin() && to.path !== '/login') {
    next('/login')
  }else{
    next()
  }
})


  router.afterEach(transition => {

  })

  export default router


