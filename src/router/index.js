import Vue from 'vue'
import Router from 'vue-router'
import Config from "@/config/app.js"


const LoginView = () => import("@/views/Login.vue")
const DashboardView = () => import('@/views/Dashboard.vue')

Vue.use(Router)

let RouteList = [
    {path: "/", redirect: "/login"},
    {path: "/login", name: "", component: LoginView, meta: {title: "登录"}},
    {path:"/dashboard",component:DashboardView,name:"dashboard"},
    {path: "**", redirect: "/login"}
]

const router = new Router({routes: RouteList})
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName
    next()
})
export default router


