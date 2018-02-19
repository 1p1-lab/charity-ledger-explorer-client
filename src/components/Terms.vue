<template>

  <div id="page-terms">

    <div class="wr-main-info">
      <div class="container">
        <div class="main-info" v-html="$t('terms.HTML_CONTENT')">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Terms',
  }
</script>

<style>
  ol {
    list-style:    none;
    counter-reset: li;
  }

  ol > li:before {
    counter-increment: li;
    content: counters(li, ".") ". ";
  }
  ol > li ul li:before {
    content: '- ';
  }
</style>
