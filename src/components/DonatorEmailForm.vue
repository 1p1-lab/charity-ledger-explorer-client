<template>
  <div id="donator-email-form">
    <div class="wr-main-intro">
      <div class="container">
        <div class="main-intro">
          <h1>{{ $t('donatorEmailForm.CONTROL_OF_DONATIONS') }}</h1>
          <p v-show="busy">{{ $t('donatorEmailForm.SEARCHING') }}</p>
          <form @submit.prevent="onSubmit" v-show="!busy">
            <input type="email" id="email" :placeholder="$t('donatorEmailForm.EMAIL_PLACEHOLDER')" v-model="email">
            <p>{{ $t('donatorEmailForm.HELP_BELOW_EMAIL_INPUT') }}</p>
            <button type="submit">{{ $t('donatorEmailForm.SEARCH_MY_EMAIL_BTN') }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { donatorApi } from '../api'

  export default {
    name: 'DonatorEmailForm',

    data () {
      return {
        email: '',
        busy: false,
      }
    },

    methods: {
      onSubmit () {
        if (this.email.length > 0) {
          this.busy = true
          this.$store.dispatch('login', this.email)
            .then(() => {
              this.$emit('changed')
              this.busy = false
            })
            .catch((exception) => {
              const message = _.get(exception, 'data.error.message', this.$i18n.translate('errors.UNKNOWN_ERROR'))
              const code    = exception.status

              let obj = {
                 title: this.$i18n.translate('alert.ALERT_TITLE_ERROR'),
                 message: message,
                 type: 'error',
                 onClose: this.onClose
              }

              this.$Simplert.open(obj)

              this.busy = false
            })

        }
        else {
          const message = this.$i18n.translate('donatorEmailForm.EMPTY_EMAIL_MSG')
          let obj = {
             title: '',//this.$i18n.translate('alert.ALERT_TITLE_WARNING'),
             message: message,
             type: 'warning',
             onClose: this.onClose,
          }

          this.$Simplert.open(obj)
        }
      }
    }
  }
</script>

<style scoped>
</style>
