<template>
  <div class="wrapper">
    <header-bar></header-bar>
    <conten-list></conten-list>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import HeaderTabs from '../components/HeaderTabs.vue'
  import ContenList from '../components/ContentList.vue'
  import FooterNav from '../components/FooterNav.vue'
  import axios from 'axios'
  export default {
    components: {
      FooterNav,
      HeaderBar,
      HeaderTabs,
      ContenList,
      axios
    }
  }
</script>
