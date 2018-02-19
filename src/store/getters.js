/**
 * Module getters.js
 *
 * State getters
 * Are available from any component as this.$store.getters.<название> (as variable, not function)
 *
 * @author  Alexey Marunin <amarunin@oneplus1.ru>
 * @since   1.0
 */

const isLogged = state => {
  return (state.user !== null)
}

const username = state => {
  if (!state.user) return ''
  return (state.user.name ? state.user.name : state.user.email)
}

const email = state => {
  if (!state.user) return ''
  return state.user.email
}

const moment = state => {
  return state.moment()
}

export default {isLogged, username, email, moment}
