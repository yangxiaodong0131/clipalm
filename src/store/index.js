
// import Vue from 'vue'

import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

module.exports = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
