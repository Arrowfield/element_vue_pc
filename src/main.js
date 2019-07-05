import Vue from 'vue'
import store from './store/'
import ElementUI from 'element-ui'
import './assets/css/style.scss'
import router from './router/'
import Config from './config/app'
import {isLogin} from './utils/dataStorage'
import App from './App.vue'


Vue.prototype.$Config = Config;

Vue.use(ElementUI)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
