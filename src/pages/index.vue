<template>
  <div class="wrapper">
    <header-bar></header-bar>
    <header-tabs></header-tabs>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import HeaderTabs from '../components/HeaderTabs.vue'
  import FooterNav from '../components/FooterNav.vue'
  import axios from 'axios'
  export default {
    components: {
      FooterNav,
      HeaderBar,
      HeaderTabs,
      axios
    }
  }
</script>
<style>

</style>
