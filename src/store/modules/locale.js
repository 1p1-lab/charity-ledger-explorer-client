/**
 * Module locale.js
 * State module for Locale
 *
 * @author  Alex G <alexg@oneplus1.ru>
 * @since   1.0
 */

const namespaced = false

const state = {
  userLocale: 'en',
  userLocaleFull: 'en-US',
}

const getters = {
  userLocale: () => {
    return state.userLocale
  },
  userLocaleFull: () => {
    return state.userLocaleFull
  },
}

const actions = {
  setUserLocale ({commit}, userLocale) {
    commit('setUserLocale', userLocale)
  },
  setUserLocaleFull ({commit}, userLocaleFull) {
    commit('setUserLocaleFull', userLocaleFull)
  },
}

const mutations = {
  setUserLocale (state, userLocale) {
    state.userLocale = userLocale
  },
  setUserLocaleFull (state, userLocaleFull) {
    state.userLocaleFull = userLocaleFull
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
