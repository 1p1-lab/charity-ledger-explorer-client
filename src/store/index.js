/**
 * Module index.js
 *
 * Vuex Initialization
 *
 * @author  Alexey Marunin <amarunin@oneplus1.ru>
 * @since   1.0
 */

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules,
})
