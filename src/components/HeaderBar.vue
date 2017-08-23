<template>
  <mu-appbar class="HeaderBar">
    <img class="logo" src="../assets/logo.png" alt="" >
    <mu-icon-button icon="send" slot="right" to="/Vue-app/src/pages/publish"/>
  </mu-appbar>
</template>
<script>
  export default {
    name: 'HeaderBar'
  }
</script>
<style scoped>
  .HeaderBar {
    position: fixed;
    top: 0;
    height: 4rem;
  }
  .logo {
    width: 4rem;
    height: 4rem;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
