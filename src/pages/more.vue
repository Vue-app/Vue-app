<template>
<div class="wrapper">
  <mu-appbar class="header">
    <span>更多</span>
  </mu-appbar>
  <div class="main">
    <mu-list>
      <mu-list-item class="my-content" title="项目API" href="https://www.vue-js.com/api/">
        <mu-icon slot="left" value="loyalty" />
      </mu-list-item>
      <mu-list-item class="my-content" title="项目地址&给star啊亲" href="https://github.com/Vue-app/Vue-app">
        <mu-icon slot="left" value="star" />
      </mu-list-item>
    </mu-list>
  </div>
  <footer-nav></footer-nav>
</div>
</template>
<script>
  import FooterNav from '../components/FooterNav'
  export default {
    components: {
      FooterNav
    }
  }
</script>
<style lang="stylus">
.header
  text-align center
</style>
