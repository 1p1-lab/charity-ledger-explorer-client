/**
 * Module mutations.js
 *
 * Mutations list
 * Mutations shall be synchronous!
 *
 * @author  Alexey Marunin <amarunin@oneplus1.ru>
 * @since   1.0
 */

const authorize = (state, user) => {
  state.user = user
}

export default {authorize}
