/**
 * Module nav-menu.js
 * State module for NavMenu component
 *
 * @author  Marunin Alexey <amarunin@oneplus1.ru>
 * @since   1.0
 */

const namespaced = true

const state = {
  isMobileMenuActivated: false
}

const getters = {
  isMobileMenuActivated: state => state.isMobileMenuActivated,
}

const actions = {
  showMobileMenu ({commit}) {
    commit('showMobileMenu')
  },
  hideMobileMenu ({commit}) {
    commit('hideMobileMenu')
  },
  toggleMobileMenu ({commit, state}) {
    commit('toggleMobileMenu', !state.isMobileMenuActivated)
  },
}

const mutations = {
  showMobileMenu (state) {
    state.isMobileMenuActivated = true
  },
  hideMobileMenu (state) {
    state.isMobileMenuActivated = false
  },
  toggleMobileMenu (state, active) {
    state.isMobileMenuActivated = active
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
