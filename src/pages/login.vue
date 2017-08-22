<template>
  <div class="wrapper">
    <mu-appbar  class="header">
      <span class="my-news-title">登录</span>
      <a href="https://www.vue-js.com/signup">注册</a>
    </mu-appbar>
    <div class="login-key">
      <mu-text-field label="请输入accessToken" v-model="val" :errorText="error" hintText="accessToken" type="password" labelFloat /><br/>
      <mu-raised-button @click="login" label="登录" class="demo-raised-button" primary/><br/>
    </div>
    <div class="get-at">
      <mu-raised-button icon="help_outline" label="如何获取accessToken" class="demo-snackbar-button" @click="showSnackbar" />
      <mu-snackbar v-if="snackbar" message="登录vue.js中文社区,在设置页面可看到自己的accessToken" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import FooterNav from '../components/FooterNav.vue'
  import axios from 'axios'
  export default {
    components: {
      FooterNav
    },
    data () {
      return {
        val: '',
        error: '',
        snackbar: false
      }
    },
    methods: {
      showSnackbar () {
        this.snackbar = true
        if (this.snacckTimer) clearTimeout(this.snackTimer)
        this.snackTimer = setTimeout(() => {
          this.snackbar = false
        }, 5000)
      },
      hideSnackbar () {
        this.snackbar = false
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
      login () {
        let that = this
        axios.post('https://www.vue-js.com/api.v1/accesstoken', {
          accesstoken: that.val
        })
        .then(function (response) {
          that.error = ''
          localStorage.setItem('accesstoken', that.val)
          localStorage.setItem('user_id', response.data.id)
          localStorage.setItem('loginname', response.data.loginname)
          that.$router.push({
            path: '/Vue-app/src/pages/my'
          })
        }).catch(function (error) {
          if (!that.val) {
            that.error = 'accesstoken不能为空'
          } else {
            console.log(error)
            that.error = '输入错误,请重新输入'
            console.log(that.$route.matched)
            that.$route.matched[0].meta = {
              requiresAuth: true
            }
          }
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
.wrapper
  span
    padding-left 9rem
  a
    float right
    font-size 1rem
.login-key
  text-align center
  margin-top 10rem
  .demo-raised-button
    margin-top 3rem
.get-at
  text-align center
  margin-top 1.3rem
  font-size 1rem



</style>
