<template>
  <div id="app">
    <simplert
        :useRadius="true"
        :useIcon="true">
    </simplert>

    <!--[if lt IE 10]>
    <p class="browsehappy" v-html="$t('common.HTML_OLD_IE_BROWSER')"></p>
    <![endif]-->

    <!-- Preloader  -->
    <div class="preloader"></div>

    <!-- Application -->
    <div class="app">

      <!-- Header -->
      <header>
        <div class="wr-header">
          <div class="container">
            <div class="header">
              <router-link :to="{name:'home'}" class="logo">
                <img src="/static/assets/img/logo.svg">
              </router-link>

              <nav-menu layout="desktop"></nav-menu>
            </div>
          </div>
        </div>

        <div v-show="false" class="wr-subheader">
          <div class="container">
            <div class="subheader">
              <p v-html="$t('app.subHeader.HTML_ADVANTAGES_OF_REGISTRATION')"></p>
              <ul>
                <li>
                  <span>%</span>
                  <p v-html="$t('app.subHeader.HTML_DISCOUNT_FOR_PRODUCTS')"></p>
                </li>
                <li>
                  <span><i class="icon icon-eye"></i></span>
                  <p v-html="$t('app.subHeader.HTML_EMAIL_NOTIFICATIONS')"></p>
                </li>
                <li>
                  <span><i class="icon icon-chart"></i></span>
                  <p v-html="$t('app.subHeader.HTML_DETAILED_STATISTICS')"></p>
                </li>
              </ul>
              <a href="#" class="btn register"><span v-html="$t('common.HTML_REGISTER_BTN_CAPTION')"></span></a>
            </div>
          </div>
        </div>

      </header>

      <nav-menu layout="mobile"></nav-menu>

      <errorComponent v-if="isShowError && errorComponent" :is="errorComponent" />
      <router-view :class="'lang-'+this.$store.getters['userLocale']" v-else/>

      <!-- Footer -->
      <footer class="wr-footer">
        <div class="container">
          <div class="footer">
            <p>
              <small>{{ $t('app.COPYRIGHT', {year: 2018}) }}</small>
            </p>
            <nav>
              <ul>
                <li>
                  <a target="_blank" href="https://1p1.io">{{ $t('app.FOOTER_HREF_MARKETPLACE') }}</a>
                </li>
                <li>
                  <router-link :to="{name:'terms'}">{{ $t('app.FOOTER_HREF_TERMS') }}</router-link>
                </li>
                <li>
                  <router-link :to="{name:'association'}">{{ $t('app.FOOTER_HREF_ABOUT_ASSOCIATION') }}</router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>

    </div>

    <!-- Plugins -->
    <div class="popup"></div>

  </div>
</template>

<script>
  import NavMenu from './components/NavMenu.vue'

  export default {
    name: 'app',

    components: {
      NavMenu
    },

    computed: {
      isLogged () {
        return this.$store.getters.isLogged
      },
      isShowError () {
        return this.$store.state.isErrorPage
      },
      errorComponent () {
        return this.$store.state.errorComponent
      },
    },

    watch: {
      '$route' () {
        // close simplert when click Back or Forward in browser
        this.$Simplert.close()

        // hide previous error when click Back or Forward in browser
        this.$store.state.hideError()
      }
    }
  }
</script>

<style scoped>
  /* TODO: Move this to CSS and add hover effect */
  .subheader .btn.register {
    background: #fff;
    color: rgb(68, 137, 255);
  }

  .simplert {
    z-index: 10000;
  }
</style>
