import Vue from 'vue'
import Router from 'vue-router'
import Config from "../config/app.js"
import {isLogin} from "../utils/dataStorage"


const LoginView = () => import("../views/Login/Login.vue")
const TestDemo = () => import("../views/TestDemo.vue")
const Goods = () => import("../views/Goods.vue")
const DashboardView = () => import('../views/Dashboard/Dashboard.vue')

Vue.use(Router)

let RouteList = [
    {path: "/", redirect: "/login"},
    //{path: "/test", name: "", component: TestDemo},
    {path: "/login", name: "", component: LoginView, meta: {title: "登录"}},
    //{path:"/goods",name:"",component:Goods},
    {path:"/dashboard",component:DashboardView},
    {path: "**", redirect: "/login"}//也可以定义一个路径错误的组件代替
]

const router = new Router({routes: RouteList})


router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName
    // if (!isLogin() && to.path !== '/login') {
    //   next('/login')
    // }else{
    //   next()
    // }
    next()
})


router.afterEach(transition => {

})

export default router


