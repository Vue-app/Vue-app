<template>
  <div class="wrapper">
    <mu-appbar class="header" title="我的消息"></mu-appbar>
    <div class="main">
      <div class="content" v-if="accesstoken">
        <mu-list-item class="" title="未读消息">
          <mu-icon slot="left" value="visibility off" />
          <mu-list-item class="list-item-content">

          </mu-list-item>
        </mu-list-item>
      </div>
    </div>
    <div class="message-tip" v-if="!accesstoken">
      <mu-raised-button to="/Vue-app/src/pages/login" label="请先登录"></mu-raised-button>
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
        accesstoken: '',
        user: {},
        res: {}
      }
    },
    created () {
      this.accesstoken = localStorage.getItem('accesstoken')
      this.getData()
    },
    methods: {
      getData () {
        let that = this
        axios.get('https://www.vue-js.com/api/v1/messages?accesstoken=' + that.accesstoken)
          .then(function (response) {
            that.readMsg = response.data.data
            console.log(that.readMsg)
          })
      }
    }
  }
</script>
<style  scoped>
.wrapper{
  text-align: center;
}
</style>
