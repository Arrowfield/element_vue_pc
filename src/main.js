import Vue from 'vue'
import store from './store/'

import router from './router/'
import Config from './config/app'
import App from './App.vue'



//导入自定义组件

import Button from './components/button'
import Avatar from './components/avatar'
import Input from './components/input'
import Checkbox from './components/checkbox'
import MyCanvas from './components/my-canvas'

const components = [
  Button,
  Avatar,
  Input,
  Checkbox,
  MyCanvas
]


const install = function(Vue,opts = {}){

  components.forEach(component =>{
    Vue.component(component.name,component)
    //Vue.use(component)
  })

  Vue.prototype.$Config = Config
}

if(typeof window !== 'undefined' ){
  install(Vue)
}


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
