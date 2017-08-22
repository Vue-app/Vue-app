<template>
<mu-paper class="footer-nav">
  <mu-bottom-nav :value="bottomNav" @change="handleChange" >
    <mu-bottom-nav-item value="home" title="首页" icon="home" to="/" />
    <mu-bottom-nav-item value="news" title="消息" icon="email" to="/Vue-app/src/pages/message" />
    <mu-bottom-nav-item value="my" title="我的" icon="person" :to="url" />
    <mu-bottom-nav-item value="more" title="更多" icon="more" to="#" />
  </mu-bottom-nav>
</mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'recents',
      url: ''
    }
  },
  watch: {
    $route: 'facthData'
  },
  mounted () {
    this.facthData()
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    },
    facthData () {
      let accesstoken = localStorage.getItem('accesstoken')
      if (accesstoken) {
        this.url = '../pages/my'
      } else {
        this.url = '../pages/login'
        console.log(this.url)
        console.log(accesstoken)
      }
//      if (this.$route.path === '/') {
//        this.bottomNav = '首页'
//      }
//      if (this.$route.path === '../pages/message') {
//        this.bottomNav = '消息'
//      }
//      if (this.$route.path === '../pages/login' || this.$route.path === '../pages/my') {
//        this.bottomNav = '我的'
//      }
//      if (this.$route.path === '#') {
//
//      }
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
