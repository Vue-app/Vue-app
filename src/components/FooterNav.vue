<template>
<mu-paper class="footer-nav">
  <mu-bottom-nav :value="bottomNav" @change="handleChange" >
    <mu-bottom-nav-item value="home" title="首页" icon="home" to="#" />
    <mu-bottom-nav-item value="news" title="消息" icon="email" to="#" />
    <mu-bottom-nav-item value="my" title="我的" icon="person" to="#" />
    <mu-bottom-nav-item value="more" title="更多" icon="more" to="#" />
  </mu-bottom-nav>
</mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'recents'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>
<style  scoped>
  .footer-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
  }
</style>
