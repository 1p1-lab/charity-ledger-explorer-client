<template>

  <div id="home">

    <donator-email-form @changed="onDonatorChanged" v-show="!isLogged" ref="form"></donator-email-form>

    <donation-list v-show="isLogged" ref="donations"></donation-list>

  </div>

</template>

<script>
  import _ from 'lodash'
  import Pagination from './base/Pagination'
  import DonatorEmailForm from './DonatorEmailForm'
  import DonationList from './DonationList'
  import {donationApi} from '../api'

  export default {
    name: 'Home',

    components: {
      DonationList,
      DonatorEmailForm,
      Pagination
    },

    data () {
      return {
      }
    },

    computed: {
      isLogged () {
        return this.$store.getters.isLogged
      },
    },

    methods: {
      onDonatorChanged () {
        this.$refs.donations.fetch()
      },
    }
  }
</script>

<style scoped>
</style>