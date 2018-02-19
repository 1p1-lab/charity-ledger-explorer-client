<template>
  <div id="root">
    <div class="wr-transactions-intro">
      <div class="container">
        <div class="page-navigation">
          <router-link :to="{name:'home'}">{{ $t('common.BACK_TO_MY_DONATIONS') }}</router-link>
          <ul>
            <li>
              <a v-show="!!website" :href="website" target="_blank" rel="nofollow">{{ $t('program.ABOUT_PROGRAM') }}</a>
            </li>
          </ul>
        </div>
        <div class="transactions-intro">
          <header>
            <p>
              <router-link v-if="idFoundation" :to="{name: 'foundation', params: {id:idFoundation}}">{{ foundationName }}</router-link>
            </p>
            <h1>{{ name }}</h1>
          </header>
          <section>
            <ul>
              <li>
                <span>{{ $t('common.DONATION_AMOUNT') }}</span>
                <p>{{ donationsTotal | localeString | rub }}</p>
              </li>
              <li v-show="false">
                <span>{{ $t('common.TARGET_STATUS') }}</span>
                <p>{{ $t('common.STATUS_FUNDRAISING') }}</p>
              </li>
            </ul>
            <p v-html="$t('common.LOYALTY_POINTS_DESC', {associationUrl: this.associationUrl})"></p>
          </section>
        </div>
      </div>
    </div>

    <div class="wr-filter" v-show="true">
      <div class="container">
        <div class="filter">
          <h2>{{ $t('program.PROGRAM_REPORT') }}</h2>
          <ul>
            <li>
              <select v-show="false">
                <option value="1">Rehabilitation course 1</option>
                <option value="2">Rehabilitation course 2</option>
                <option value="3">Rehabilitation course 3</option>
              </select>
              <div class="datepicker">
                <span class="mob">{{ $t('common.DATE_FROM') }}</span>
                <dropdown class="form-group">
                  <div class="input-group">
                    <input type="text" id="date-input-from" class="form-control date-input"
                           :value="this.$store.state.formatDateStrFromDatePicker(this.filterState.dateFrom)"
                           readonly="readonly" />
                  </div>
                  <template slot="dropdown">
                      <date-picker id="date-picker-from" class="date-picker-selector"
                                   v-model="filterState.dateFrom"
                                   :format="this.$store.state.datePickerInternalFormat"
                                   :today-btn="this.$store.state.initFilterData.isShowTodayBtn"
                                   :clear-btn="this.$store.state.initFilterData.isShowClearBtn"
                                   :week-starts-with="this.$store.state.initFilterData.weekStartsWith"
                                   :limit-from="this.$store.state.initFilterData.disabledDateOptions.from"
                                   :limit-to="this.$store.state.initFilterData.disabledDateOptions.to"
                                   v-on:input="onFilterChanged" />
                  </template>
                </dropdown>

                <span>-</span>
                <span class="mob">{{ $t('common.DATE_TO') }}</span>

                <dropdown class="form-group">
                  <div class="input-group">
                    <input type="text"
                           id="date-input-to"
                           class="form-control date-input"
                           :value="this.$store.state.formatDateStrFromDatePicker(this.filterState.dateTo)"
                           readonly="readonly" />
                  </div>
                  <template slot="dropdown">
                    <date-picker id="date-picker-to" class="date-picker-selector"
                                 v-model="filterState.dateTo"
                                 :format="this.$store.state.datePickerInternalFormat"
                                 :today-btn="this.$store.state.initFilterData.isShowTodayBtn"
                                 :clear-btn="this.$store.state.initFilterData.isShowClearBtn"
                                 :week-starts-with="this.$store.state.initFilterData.weekStartsWith"
                                 :limit-from="this.$store.state.initFilterData.disabledDateOptions.from"
                                 :limit-to="this.$store.state.initFilterData.disabledDateOptions.to"
                                 v-on:input="onFilterChanged" />
                  </template>
                </dropdown>
              </div>
            </li>
            <li v-show="true">
              <select v-show="false">
                <option value="1">All payment sources 1</option>
                <option value="2">All payment sources 2</option>
                <option value="3">All payment sources 3</option>
              </select>
              <input v-show="this.$store.getters.isLogged && this.$store.getters.email" id="filter-my-donations-on-top"
                     type="checkbox" v-model="filterState.isMyDonationsOnTop" @change="onFilterChanged">
              <label v-show="this.$store.getters.isLogged && this.$store.getters.email"
                     for="filter-my-donations-on-top">{{ $t('common.FIRST_MY_PAYMENTS') }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wr-transactions-info">
      <div class="container">
        <div class="transactions-tabs-mobile">
          <ul class="js-transaction-tabs">
            <li :class="{'active':this.tab==1}"><span @click="tab=1">{{ $t('common.TAB_DONATIONS') }}</span></li>
            <li :class="{'active':this.tab==2}"><span @click="tab=2">{{ $t('common.TAB_EXPENSES') }}</span></li>
          </ul>
        </div>
        <div class="transactions-info">
          <div :class="{'transaction-tab':true,'income':true,'active':tab==1}">
            <header>
              <h3>{{ $t('common.DONATIONS_FOR_THE_PERIOD') }}</h3>
              <p>{{ donationsTotal | localeString | rub }}</p>
            </header>
            <ul>
              <li v-for="(item, index) in donations" :class="{ active: item.isMyDonation == 1 }">
                <span class="date">{{ item.dDoc | date }}</span>
                <p>{{ item.sum | localeString | rub }}</p>
                <ul>
                  <li>
                    <span>{{ $t('common.DONATION_SOURCE') }}</span>
                    <p>{{ item.nameSource }}</p>
                  </li>
                  <li>
                    <span>{{ $t('common.DONATOR') }}</span>
                    <p>{{ item.nameDonator }}</p>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
          <div :class="{'transaction-tab':true,'expense':true,'active':tab==2}">
            <header>
              <h3>{{ $t('common.EXPENSES_FOR_THE_PERIOD') }}</h3>
              <p>{{ expensesTotal | localeString | rub }}</p>
            </header>
            <ul>
              <li v-for="(item, index) in expenses">
                <span class="date">{{ item.dDoc | date }}</span>
                <p>{{ item.sum | localeString | rub }}</p>
                <ul>
                  <li>
                    <span>{{ $t('common.EXPENSE_DESCRIPTION') }}</span>
                    <p>{{ item.costItemName }}</p>
                    <span v-if="item.costItemName && item.remark"><br></span>
                    <p v-if="item.remark">{{ item.remark }}</p>
                  </li>
                  <li v-if="item.beneName">
                    <span>{{ $t('common.ASSISTANCE_PROVIDED') }}</span>
                    <p>{{ item.beneName }}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { foundationApi } from '../api'

  export default {
    name: 'Program',

    components: {
    },

    data () {
      return {
        busy:           false,
        idFoundation:   null,
        idProgram:      null,
        foundationName: '',
        name:           '',
        website:        '',
        donationsTotal: 0,
        expensesTotal:  0,
        donations:      {},
        expenses:       {},

        tab:       1,

        filterState: {
          dateFrom: this.$store.state.getStrDatePickerDateFrom(),
          dateTo:   this.$store.state.getStrDatePickerDateTo(),
          isMyDonationsOnTop: false,
        }
      }
    },

    computed: {
      associationUrl() {
        return this.$router.resolve({
          name: 'association'
        }).href
      }
    },

    created () {
      this.idFoundation = this.$route.params.idFoundation
      this.idProgram    = this.$route.params.idProgram
      this.fetch()
    },

    methods: {
      fetch () {
        this.busy = true
        let filter = this.filterState

        const dateFrom = this.$store.state.convertJsDateToApiFormat(this.filterState.dateFrom)
        const dateTo   = this.$store.state.convertJsDateToApiFormat(this.filterState.dateTo)

        filter = {dateFrom, dateTo}

        if (this.$store.getters.isLogged && this.$store.getters.email) {
          _.extend(filter, {donatorEmail: this.$store.getters.email})
        }

        if (this.filterState.isMyDonationsOnTop) {
          _.extend(filter, {isMyDonationsOnTop: 1})
        }

        return foundationApi.find.program.one(this.idFoundation, this.idProgram, filter)
          .then((data) => {
            this.name = data.program.name
            this.website = data.program.website
            this.foundationName = data.program.nameFoundation

            this.donationsTotal = data.totalDonations ? data.totalDonations : 0
            this.expensesTotal  = data.totalExpenses  ? data.totalExpenses  : 0

            this.donations = data.donations
            this.expenses = data.expenses

            this.busy = false
          })
          .catch((error) => {
            this.$store.state.error(error)
            this.busy = false
          })
      },

      onFilterChanged () {
        this.fetch()
      }
    }

  }
</script>

<style scoped>
</style>
