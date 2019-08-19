import Vue from 'vue'
import Router from 'vue-router'
import Config from "../config/app.js"

import {isLogin} from "../utils/dataStorage"


import Main from '../views/system/Main'
import Role from '../views/system/Role'
import Icon from '../views/system/Icon'

var SystemRouter = {
  path:"system",
  component:Main,
  children:[
    {path:"",redirect:'role'},
    {path:"role",component:Role,meta:{title:'角色管理'}},
    {path:"icon",component:Icon,meta:{title:'图标管理'}}
  ]
}

Vue.use(Router)

let RouteList = [
  {path:"/",redirect:"/login"},
  {path: '/home', component: resolve => require(['@/views/Layout/App.vue'], resolve),
    children: [
      {
        path: '/', name: 'Dashboard',
        component: resolve => require(['@/views/Home/Index.vue'], resolve),
        meta: {auth:true,title:"首页"}
      },
      SystemRouter
    ]
  },
  {
    path: '/login', name: 'Login',
    components: {login: resolve => require(['@/views/Login/Login.vue'], resolve)},
    meta:{title:"后台登录"},
    beforeEnter:(to,form,next)=>{if(isLogin()){next('/home')}else{next()}}
  },
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
//（1）登录状态下，用户无法进入登录界面
//(2) 路径输入错误，用户登录，进入首页；用户未登录，进入登录页面

  router.afterEach(transition => {

  })

  export default router


