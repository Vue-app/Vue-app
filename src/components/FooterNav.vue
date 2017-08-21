<template>
  <div>
    <div class="footer-nav">
      <router-link to="#">首页</router-link>
      <router-link to="#">信息</router-link>
      <router-link to="#">我的</router-link>
      <router-link to="#">更多</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'FooterNav'
  }
</script>
<style  scoped>
  .footer-nav {
    width: 100%;
    background-color: red;
  }
</style>
