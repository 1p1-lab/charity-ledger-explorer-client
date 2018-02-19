<template>
    <div class="error-404">
        <base-error :errorMessage="errorMessage">
        </base-error>
    </div>
</template>

<script>
  import BaseError from './BaseError'

  export default {
    name: 'Error404',

    components: {
      BaseError
    },

    data () {
      return {
        errorMessage: '',
      }
    },

    created () {
      this.errorMessage = this.$i18n.translate('errors.ERROR_MESSAGE_404')
    },
  }
</script>

<style scoped>
</style>
