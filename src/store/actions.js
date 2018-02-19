/**
 * Module actions.js
 *
 * List of actions (global)
 *
 * @author  Alexey Marunin <amarunin@oneplus1.ru>
 * @since   1.0
 */

import {donatorApi} from '../api'

const login = ({commit}, email) => {
  return donatorApi.find.byEmail(email)
    .then(user => {
      user['email'] = email
      commit('authorize', user)
    })
}

const logout = ({commit}) => {
  commit('authorize', null)
}

export default {login, logout}
