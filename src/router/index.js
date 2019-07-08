import Vue from 'vue'
import Router from 'vue-router'
import Config from "../config/app.js"
import {isLogin} from "../utils/dataStorage"


import Main from '../views/system/Main'
import Role from '../views/system/Role'
var SystemRouter = {
  path:"system",
  component:Main,
  children:[
    {path:"",redirect:'role'},
    {path:"role",component:Role,meta:{title:'角色管理'}}
  ]
}

Vue.use(Router)

let RouteList = [
  {path:"/",redirect:"/login"},
  {path: '/home', component: resolve => require(['@/views/layout/App.vue'], resolve),
    children: [
      {
        path: '/', name: 'Dashboard',
        component: resolve => require(['@/views/home/Index.vue'], resolve),
        meta: {auth:true,title:"首页"}
      },
      SystemRouter
    ]
  },
  {
    path: '/login', name: 'Login',
    components: {login: resolve => require(['@/views/login/Login.vue'], resolve)},
    meta:{title:"后台登录"},
    beforeEnter:(to,form,next)=>{if(isLogin()){next('/home')}else{next()}}
  },
  {path:"**",redirect:"/login"}
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
//（1）登录状态下，用户无法进入登录界面

  router.afterEach(transition => {

  })

  export default router


