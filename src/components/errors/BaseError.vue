<template>
    <div class="base-error">
        <div class="wr-main-info">
          <div class="container">
            <div class="main-info">
              <h2>{{ this.errorMessage }}</h2>
                <router-link to="/" exact>
                    {{ $t('errors.RETURN_TO_HOME_PAGE') }}
                </router-link>
            </div>
          </div>
        </div>
     </div>
</template>

<script>
  export default {
    name: 'BaseError',
    props: ['errorMessage'],
  }
</script>

<style scoped>
</style>
