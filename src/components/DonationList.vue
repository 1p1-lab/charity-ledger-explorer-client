<template>
  <div id="donation-list">
    <div class="wr-main-info">
      <div class="container">
        <div class="main-info">
          <h2>{{ username }}</h2>
          <ul v-if="false">
            <li>
              <div class="select js-select">
                <a href="#">All foundations</a>
                <ul>
                  <li>
                    <a href="#">Fight against leukemia</a>
                  </li>
                  <li>
                    <a href="#">Sport stars</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="select js-select">
                <a href="#">All purposes of donations</a>
                <ul>
                  <li>
                    <a href="#">Fight against leukemia</a>
                  </li>
                  <li>
                    <a href="#">Sport stars</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <table>
            <tr>
              <th>{{ $t('donationList.COL_AMOUNT') }}</th>
              <th>{{ $t('donationList.COL_FOUNDATION') }}</th>
              <th>{{ $t('donationList.COL_TARGET') }}</th>
              <th>{{ $t('donationList.COL_DATE') }}</th>
              <th>{{ $t('donationList.COL_TRANSACTION_NUM') }}</th>
            </tr>
            <tr v-for="item in items">
              <td><span>{{ item.sum | localeString | rub }}</span></td>
              <td><router-link :to="{ name: 'foundation', params:{id:item.idFoundation} }">{{ item.nameFoundation }}</router-link></td>
              <td><router-link :to="{ name: 'target', params:{idFoundation: item.idFoundation, idTarget: item.idTarget} }">{{ item.nameTarget }}</router-link></td>
              <td>{{ item.dDoc | date }}</td>
              <td>{{ item.idDonation }}</td>
            </tr>
          </table>
          <br>
          <pagination v-show="false" :state="pagination" @pageChanged="setPage"></pagination>

          <span v-if="totalSum !== null" class="totalSum">{{ $t('common.TOTAL') }}: {{ totalSum | localeString | rub }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Pagination from './base/Pagination'
  import { donationApi } from '../api'

  export default {
    name: 'DonationList',

    components: {
      Pagination
    },

    data () {
      return {
        items:      [],
        filter:     {},
        pagination: {
          count:      0,
          totalCount: 0,
          perPage:    0,
          totalPages: 0
        },
        totalSum:   null,
        busy:       true
      }
    },

    computed: {
      username () {
        return this.$store.getters.username
      },
      email () {
        return this.$store.getters.email
      },
      isLogged () {
        return this.$store.getters.isLogged
      },
    },

    methods: {
      fetch (page) {
        this.busy  = true
        let filter = this.filter
        _.extend(filter, {limit: 1000})
        //_.extend(filter, {limit: 10})
        //if (page) {
        //  _.extend(filter, {page})
        //}
        if (this.email) {
          _.extend(filter, {donatorEmail: this.email})
        }

        donationApi.find.all(filter)
          .then((data) => {
            this.items                 = data.items
            this.pagination.count      = data.count
            this.pagination.totalCount = data.totalCount
            this.pagination.perPage    = data.perPage
            this.pagination.totalPages = data.totalPages
            this.pagination.page       = data.page
            this.totalSum              = _.result(data, 'totalSum', null)
            this.busy                  = false
          })
          .catch((error) => {
            this.$store.state.error(error)
            this.busy = false
          })
      },

      setPage (page) {
        this.fetch(page)
      },

    },

    mounted () {
      if (this.isLogged) {
        this.fetch()
      }
    }
  }
</script>

<style scoped>
</style>
