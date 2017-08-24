<template>
  <div class="wrapper">
    <mu-appbar class="header" title="我的消息"></mu-appbar>
    <div class="main">
      <div class="content" v-if="accesstoken">
        <mu-list-item class="list-item" title="未读消息" v-if="res.hasnot_read_messages" toggleNested :open="false">
          <mu-icon slot="left" value="visibility_off" />
          <mu-list-item  :to="{path:'/Vue-app/src/pages/content',query:{id:item.topic.id}}" v-for="item in res.hasnot_read_messages" :key="item.id" slot="nested" :title="item.title">

          </mu-list-item>
          <span class="res-number">{{res.hasnot_read_messages.length}}</span>
        </mu-list-item>
        <!--已读消息-->
        <mu-list-item class="list-item" v-if="res.has_read_messages" title="已读消息" toggleNested :open="false">
          <mu-icon slot="left" value="visibility" />
          <mu-list-item class="list-item-content" :to="{path:'/Vue-app/src/pages/content', query:{id:item.id}}" v-for="item in res.has_read_message" :key="item.id" slot="nested" :title="item.title">
            <span>来自 <strong>{{item.author.loginname}}</strong></span>
            <span class="message-time">{{item.reply.create_at | formatDate}}</span>
            <p class="message-content">{{item.reply.content}}</p>
            <span class="message-title">帖子：《{{item.topic.title}}》</span>
            <span class=""></span>
          </mu-list-item>
          <span class="res-number">{{res.has_read_messages.length}}</span>
        </mu-list-item>
      </div>
    </div>
    <div class="message-tip" v-if="!accesstoken">
      <mu-raised-button to="/Vue-app/src/pages/login" label="请先登录" primary></mu-raised-button>
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
        if (!this.accesstoken) return
        axios.get('https://www.vue-js.com/api/v1/messages?accesstoken=' + that.accesstoken)
          .then(function (response) {
            that.res = response.data.data
            console.log(that.res)
          })
      }
    }
  }
</script>
<style lang="stylus" scoped>
.wrapper{
  text-align: center;
}
.content
  margin-top 1rem
  text-align left
  position relative
  font-size 1rem
  .list-item
    text-align left
  .res-number
    position: absolute
    right 4rem
    bottom .8rem
    float  right
.message-tip
  margin-top 10.8rem
</style>
