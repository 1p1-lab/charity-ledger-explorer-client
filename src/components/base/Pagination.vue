<template>
  <div class="pagination">
    <base-pagination v-if="params && params.count"
            :records="params.count"
            :per-page="params.perPage"
            :count-text="$t('pagination.RECORDS_PLURAL_NOTATION_MANY_1')+' {from}-{to} '+$t('pagination.OF')+' {count}|'+$t('pagination.RECORDS_PLURAL_NOTATION_MANY_2')+': {count}|1 '+$t('pagination.RECORDS_PLURAL_NOTATION_ONE')"
            @paginate="setPage">
    </base-pagination>
  </div>
</template>

<script>
  // See https://github.com/matfish2/vue-pagination-2
  const BasePagination = require('vue-pagination-2').Pagination

  export default {
    name: 'Pagination',
    props: {
      state: {
        type: Object,
        required: true,
        'default': {
          count: 0,
          perPage: 0,
          totalPages: 0
        }
      }
    },
    components: {
      BasePagination
    },
    data () {
      return {
        page: 0,
        params: this.state
      }
    },
    methods: {
      setPage (page) {
        this.page = page
        this.$emit('pageChanged', page)
      }
    },
  }
</script>

<style scope>

</style>
