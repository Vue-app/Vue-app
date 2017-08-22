<template>
  <div class="wrapper">
    <mu-appbar class="header" title="我的消息"></mu-appbar>
    <div class="main">
      <div class="content" v-if="accesstoken">
        <mu-list-item class="" title="未读消息">
          <mu-icon slot="left" value="visibility off" />
          <mu-list-item class="list-item-content"></mu-list-item>
        </mu-list-item>
      </div>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import FooterNav from '../components/FooterNav.vue'
  import axios from 'axios'
  export default {
    components: {
      FooterNav,
      axios
    },
    data () {
      return {
        accesstoken: '',
        user: {},
        readMsg: {}
      }
    }
//    methods: {
//      getData () {
//        let that = this
//        axios.get("https://www.vue-js.com/api/v1/message?accesstoken=" + that.accesstoken).then(function (response) {
//          console.log(response)
//        })
//      }
//    }
  }
</script>
<style  scoped>
.wrapper{
  text-align: center;
}
</style>
