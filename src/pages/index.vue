<template>
  <div class="wrapper">
    <header-bar></header-bar>
    <header-tabs></header-tabs>
    <content-list></content-list>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import HeaderTabs from '../components/HeaderTabs.vue'
  import ContentList from '../components/ContentList.vue'
  import FooterNav from '../components/FooterNav.vue'
  export default {
    components: {
      FooterNav,
      HeaderBar,
      HeaderTabs,
      ContentList
    }
  }
</script>
<style scoped>
  .wrapper{
    height: 100%;
    overflow: auto;
  }
</style>
