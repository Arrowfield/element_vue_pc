import Vue from 'vue'
import Vuex from 'vuex'

import dashboard from './modules/dashboard'
import login from '@/store/modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    dashboard,
    login
  },
  state: {

  },
  mutations: {

  }
})


