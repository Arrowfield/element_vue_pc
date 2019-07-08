import Vue from 'vue'
import Router from 'vue-router'
import Config from "../config/app.js"
import {isLogin} from "../utils/dataStorage"
Vue.use(Router)

let RouteList = [
  {path:"/",redirect:"/login"},
  {path: '/home', component: resolve => require(['@/views/layout/App.vue'], resolve),
    children: [
      {
        path: '/', name: 'Dashboard',
        component: resolve => require(['@/views/home/Index.vue'], resolve),
        meta: {auth:true,title:"首页"}
      }
    ]
  },
  {path: '/login', name: 'Login', components: {login: resolve => require(['@/views/login/Login.vue'], resolve)},meta:{title:"后台登录"}},
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


