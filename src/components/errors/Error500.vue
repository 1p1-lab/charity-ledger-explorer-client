<template>
    <div class="error-500">
        <base-error :errorMessage="errorMessage">
        </base-error>
    </div>
</template>

<script>
  import BaseError from './BaseError'

  export default {
    name: 'Error500',

    components: {
      BaseError
    },

    data () {
      return {
        errorMessage: '',
      }
    },

    created () {
      this.errorMessage = this.$i18n.translate('errors.ERROR_MESSAGE_500')
    },
  }
</script>

<style scoped>
</style>
