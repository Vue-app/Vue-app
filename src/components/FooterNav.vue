<template>
<mu-paper class="footer-nav">
  <mu-bottom-nav :value="bottomNav" @change="handleChange" >
    <mu-bottom-nav-item value="home" title="首页" icon="home" to="/" />
    <mu-bottom-nav-item value="news" title="消息" icon="email" to="/Vue-app/src/pages/message" />
    <mu-bottom-nav-item value="my" title="我的" icon="person" :to="person_path" />
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
    },
    facthData () {
      let accesstoken = localStorage.getItem('accesstoken')
      if (accesstoken) {
        this.person_path = '/Vue-app/src/pages/my'
      } else {
        this.person_path = '/Vue-app/src/pages/login'
      }
      if (this.$route.path === '/') {
        this.bottomNav = '首页'
      }
      if (this.$route.path === '/Vue-home/src/pages/message') {
        this.bottomNav = '消息'
      }
      if (this.$route.page === '/Vue-home/src/pages/login' || this.$route.page === 'Vue-app/src/pages/my') {
        this.bottomNav = '我的'
      }
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
  }
</style>
