<template>
  <div class="wr-funds">
    <div class="container">
      <div v-show="busy" class="alert alert-warning">
        {{ $t('common.LOADING') }}
      </div>
      <div v-show="!busy && !items" class="alert alert-danger">
        {{ $t('foundations.FOUNDATIONS_IS_EMPTY') }}
      </div>
      <div v-show="!busy && items" class="funds">
        <h1>{{ $t('foundations.CHARITY_FOUNDATIONS') }}</h1>
        <ul>
          <li v-for="item in items" v-show="item.idFoundation != 1" :title="item.name">
            <router-link :to="{name: 'foundation', params: {id: item.idFoundation}}">
              <figure>
                <img :alt="item.name" :src="logo(item)">
              </figure>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { foundationApi } from '../api'

  const logoPath = '/static/assets/img/funds/'

  export default {
    name: 'Foundations',
    data () {
      return {
        items:      [],
        pagination: {
          count:      0,
          totalCount: 0,
          page:       0,
          perPage:    0,
          totalPages: 0
        },
        busy:       true
      }
    },

    methods: {

      fetch () {
        this.busy = true

        return foundationApi.find.all()
          .then((data) => {
            this.items      = data.items
            this.pagination = {
              count:      data.count,
              totalCount: data.totalCount,
              page:       data.page,
              perPage:    data.perPage,
              totalPages: data.totalPages
            }
            this.busy       = false
          })
          .catch((error) => {
            this.$store.state.error(error)
            this.busy = false
          })
      },

      logo (foundation) {
        const id = (foundation.idMarketplace ? foundation.idMarketplace : 0)
        return logoPath + 'f_' + id + '_logo.png'
      }
    },

    mounted () {
      this.fetch()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
