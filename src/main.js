import Vue from 'vue'
import store from './store/'
import router from './router/'
import Config from './config/app'
import App from './App.vue'

//import VueKonva from 'vue-konva'
//import VCharts from 'v-charts'
//import VeLine from 'v-charts/lib/line.common'
//导入自定义组件
import Button from './components/button'
import Avatar from './components/avatar'
import Input from './components/input'
import Checkbox from './components/checkbox'
import MyCanvas from './components/my-canvas'
import FRadio from './components/f-radio'

const components = [
  Button,
  Avatar,
  Input,
  Checkbox,
  MyCanvas,
  FRadio,
  //VeLine
]

const install = function(Vue,opts = {}){
  components.forEach(component =>{Vue.component(component.name,component)})
  Vue.prototype.$config = Object.freeze(Config)
  //Vue.prototype.$util = Object.freeze(Util)
  //Vue.use(VueKonva)
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
