<template>
  <div>
    <div class="footer-nav">
      <router-link to="#">首页</router-link><router-link to="#">信息</router-link><router-link to="#">我的</router-link><router-link to="#">更多</router-link>
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
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #eee;
    border-top: 1px solid #999;
  }
  a {
    text-align: center;
    color: #3c3c3c;
    display: inline-block;
    width: 25%;
    height: 50px;
  }
</style>
