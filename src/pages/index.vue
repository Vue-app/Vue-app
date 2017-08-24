<template>
  <div class="wrapper">
    <header-bar></header-bar>
    <header-tabs></header-tabs>
    <conten-list></conten-list>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import HeaderTabs from '../components/HeaderTabs.vue'
  import ContenList from '../components/ContentList.vue'
  import FooterNav from '../components/FooterNav.vue'
  export default {
    components: {
      FooterNav,
      HeaderBar,
      HeaderTabs,
      ContenList,
    }
  }
</script>
<style>

</style>
