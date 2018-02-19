<template>
  <div id="root">
    <div class="wr-fund-intro">
      <div class="container">
        <div class="page-navigation">
          <router-link :to="{name:'foundations'}">{{ $t('foundation.BACK_TO_FOUNDATIONS') }}</router-link>
          <ul>
            <li>
              <a v-show="!!website" :href="website" target="_blank" rel="nofollow">{{ $t('foundation.ABOUT_FOUNDATION') }}</a>
            </li>
          </ul>
        </div>
        <div class="fund-intro">
          <h1>{{ name }}</h1>
          <p v-html="$t('foundation.HTML_FOUNDATION_DESC')"></p>
        </div>
      </div>
    </div>

    <div class="wr-filter" v-show="true">
      <div class="container">
        <div class="filter">
          <div class="datepicker">
            <span class="mob">{{ $t('common.DATE_FROM') }}</span>
            <dropdown class="form-group">
              <div class="input-group">
                <input type="text" id="date-input-from" class="form-control date-input"
                       :value="this.$store.state.formatDateStrFromDatePicker(this.filterState.dateFrom)"
                       readonly="readonly" />
              </div>
              <template slot="dropdown">
                <li>
                  <date-picker id="date-picker-from" class="date-picker-selector"
                               v-model="filterState.dateFrom"
                               :format="this.$store.state.datePickerInternalFormat"
                               :today-btn="this.$store.state.initFilterData.isShowTodayBtn"
                               :clear-btn="this.$store.state.initFilterData.isShowClearBtn"
                               :week-starts-with="this.$store.state.initFilterData.weekStartsWith"
                               :limit-from="this.$store.state.initFilterData.disabledDateOptions.from"
                               :limit-to="this.$store.state.initFilterData.disabledDateOptions.to"
                               v-on:input="onFilterChanged" />
                </li>
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
        </div>
      </div>
    </div>

    <div class="wr-fund-info">
      <div class="container">
        <div class="fund-progress">
          <div class="progress">
            <span class="progressbar" :style="{ width: donationsPercentage + '%', background: '#00bcff' }">
              <span class="value">{{ donationsTotal | localeString | rub }}</span>
            </span>
          </div>
          <p>{{ $t('foundation.PROGRESS_LABEL_DONATIONS_AMOUNT') }}</p>
          <div class="progress">
            <span class="progressbar" :style="{ width: expensesPercentage + '%', background: '#b068d2' }">
              <span class="value">{{ expensesTotal | localeString | rub }}</span>
            </span>
          </div>
          <p>{{ $t('foundation.PROGRESS_LABEL_EXPENSES_AMOUNT') }}</p>
        </div>
      </div>
    </div>

    <div class="wr-fund-tabs">
      <div class="container">
        <div class="fund-tabs js-tabs">
          <ul>
            <li>
              <a href="#income" v-on:click.prevent="isIncomeTabActive = true" :class="{ active: isIncomeTabActive == true }">{{ $t('common.TAB_DONATIONS') }}</a>
            </li>
            <li>
              <a href="#expense" v-on:click.prevent="isIncomeTabActive = false" :class="{ active: isIncomeTabActive == false }">{{ $t('common.TAB_EXPENSES') }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div id="income" class="fund-tab" :class="{ active: isIncomeTabActive == true }">
        <div class="container">
          <table>
            <tr>
              <th>{{ $t('foundation.COL_TARGET') }}</th>
              <th>{{ $t('foundation.COL_DONATIONS_AMOUNT') }}</th>
            </tr>
            <tr v-for="(item, index) in donationsByTarget">
              <td><router-link :to="{ name: 'target', params:{idFoundation: idFoundation, idTarget: item.id} }"><span v-if="item.name">{{ item.name }}</span><span v-else>{{ $t('DONATION_NUM') }} {{ item.id }}</span></router-link></td>
              <td>{{ item.amount | localeString | rub }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div id="expense" class="fund-tab" :class="{ active: isIncomeTabActive == false }">
          <div class="container">
              <table>
                  <tr>
                      <th>
                          <ul>
                              <li>
                                  <a href="#" v-on:click.prevent="isExpensesByProjectTabActive = true"
                                      :class="{ active: isExpensesByProjectTabActive == true }">{{ $t('foundation.TAB_PROJECTS') }}</a>
                              </li>
                              <li>
                                  <a href="#" v-on:click.prevent="isExpensesByProjectTabActive = false"
                                      :class="{ active: isExpensesByProjectTabActive == false }">{{ $t('foundation.TAB_PROGRAMS') }}</a>
                              </li>
                          </ul>
                      </th>
                      <th>{{ $t('foundation.COL_EXPENSES_AMOUNT') }}</th>
                  </tr>

                  <tr v-for="(item, index) in expensesByProject" v-if="isExpensesByProjectTabActive == true">
                      <td><router-link :to="{ name: 'project', params:{idFoundation: idFoundation, idProject: item.id} }">{{ item.name }}</router-link></td>
                      <td>{{ item.amount | localeString | rub }}</td>
                  </tr>

                  <tr v-if="isExpensesByProjectTabActive == true && expensesByProject.length==0">
                      <td colspan="2" style="color: silver">{{ $t('foundation.NO_EXPENSES_BY_PROJECTS') }}</td>
                  </tr>

                  <tr v-for="(item, index) in expensesByProgram" v-if="isExpensesByProjectTabActive == false">
                      <td><router-link :to="{ name: 'program', params:{idFoundation: idFoundation, idProgram: item.id} }">{{ item.name }}</router-link></td>
                      <td>{{ item.amount | localeString | rub }}</td>
                  </tr>

                  <tr v-if="isExpensesByProjectTabActive == false && expensesByProgram.length==0">
                      <td colspan="2" style="color: silver">{{ $t('foundation.NO_EXPENSES_BY_PROGRAMS') }}</td>
                  </tr>
              </table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {foundationApi} from '../api'

  export default {
    name: 'Foundation',

    components: {
    },

    data () {
      return {
        busy:                false,
        idFoundation:        null,
        name:                '',
        website:             '',
        donationsTotal:      0,
        expensesTotal:       0,
        donationsPercentage: 0,
        expensesPercentage:  0,

        donationsByTarget:   [],
        expensesByProject:   [],
        expensesByProgram:   [],

        isIncomeTabActive: true,
        isExpensesByProjectTabActive: true,

        filterState: {
          dateFrom: this.$store.state.getStrDatePickerDateFrom(),
          dateTo:   this.$store.state.getStrDatePickerDateTo(),
        },
      }
    },

    created () {
      this.idFoundation = this.$route.params.id
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

        return foundationApi.find.one(this.idFoundation, filter)
          .then((model) => {
            const foundation = model.foundation

            this.name = foundation.name
            this.website = foundation.website

            this.donationsTotal = model.donationsTotal
            this.expensesTotal = model.expensesTotal

            this.donationsPercentage = 0
            this.expensesPercentage = 0

            if (this.donationsTotal > 0 && this.expensesTotal > 0) {

                if (this.donationsTotal >= this.expensesTotal) {
                  this.donationsPercentage = 100
                  this.expensesPercentage = this.expensesTotal / this.donationsTotal * 100
                } else {
                  this.donationsPercentage = this.donationsTotal / this.expensesTotal * 100
                  this.expensesPercentage = 100
                }

            } else {
                if (this.donationsTotal > 0) {
                  this.donationsPercentage = 100
                  this.expensesPercentage = 0
                } else
                if (this.expensesTotal > 0) {
                  this.donationsPercentage = 0
                  this.expensesPercentage = 100
                }
            }

            this.donationsByTarget = model.donations.targets
            this.expensesByProject = model.expenses.projects
            this.expensesByProgram = model.expenses.programs

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
  @media (max-width: 480px) {
    .lang-en .datepicker > span.mob {
        display: block;
        width: 45px !important;;
    }

    .lang-en .datepicker .dropdown {
        width: -webkit-calc(100% - 45px) !important;
        width: calc(100% - 45px) !important;;
        margin-bottom: 25px;
    }
  }
</style>
