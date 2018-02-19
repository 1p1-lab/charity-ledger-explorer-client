<template>

  <div id="page-accociation">

    <div class="wr-main-info">
      <div class="container association-page">
        <div class="main-info" v-html="$t('association.HTML_CONTENT')">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Association',
  }
</script>

<style>
  .association-page a {
    color: #4489ff;
  }
</style>
