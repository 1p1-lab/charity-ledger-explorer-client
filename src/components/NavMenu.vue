<template>

  <div>

    <div v-show="isDesktop">
      <nav>
        <ul>
          <li :class="{'current-menu':isHomeRoute}">
            <router-link :to="{name:'home'}">{{ $t('menu.MENU_SEARCH_MY_DONATIONS') }}</router-link>
          </li>
          <li :class="{'current-menu':isFoundationsRoute}">
            <router-link :to="{name:'foundations'}">{{ $t('menu.MENU_FOUNDATIONS') }}</router-link>
          </li>
          <li v-if="isLogged">
            <a href="/change-email" @click.prevent="logout">{{ $t('menu.MENU_CHANGE_EMAIL') }}</a>
          </li>
        </ul>

        <a href="#" class="burger" @click.prevent="toggleMobileMenu" :class="{'active':isMobileMenuActivated}">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
      </nav>
    </div>

    <div v-show="isMobile">
      <div class="wr-menu-mobile" :class="{'active':isMobileMenuActivated}">
        <div class="menu-mobile">
          <a href="#" class="close">
            <span></span>
            <span></span>
          </a>
          <nav>
            <ul>
              <li :class="{'current-menu':isHomeRoute}" @click="hideMobileMenu()">
                <router-link :to="{name:'home'}">{{ $t('menu.MENU_SEARCH_MY_DONATIONS') }}</router-link>
              </li>
              <li :class="{'current-menu':isFoundationsRoute}" @click="hideMobileMenu()">
                <router-link :to="{name:'foundations'}">{{ $t('menu.MENU_FOUNDATIONS') }}</router-link>
              </li>
              <li v-if="isLogged" @click="hideMobileMenu()">
                <a href="#" @click.prevent="logout">{{ $t('menu.MENU_CHANGE_EMAIL') }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    props: {
      layout: {
        type: String,
        require: true,
      }
    },

    data() {
      return {
        currentRoute: ''
      }
    },

    computed: {
      isDesktop() {
        return (this.layout && this.layout.toLowerCase() === 'desktop')
      },
      isMobile() {
        return (this.layout && this.layout.toLowerCase() === 'mobile')
      },
      isHomeRoute() {
        return (this.currentRoute === 'home')
      },
      isFoundationsRoute() {
        return (this.currentRoute === 'foundations')
      },
      isMobileMenuActivated() {
        return this.$store.getters['navMenu/isMobileMenuActivated']
      },
      isLogged () {
        return this.$store.getters.isLogged
      },
    },

    methods: {
      hideMobileMenu() {
        this.$store.dispatch('navMenu/hideMobileMenu')
      },
      toggleMobileMenu() {
        this.$store.dispatch('navMenu/toggleMobileMenu')
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      },
    },

    created() {
      this.$router.afterEach((to, from, next) => {
        this.currentRoute = to.name
      })
    },

  }
</script>

<style>

</style>
