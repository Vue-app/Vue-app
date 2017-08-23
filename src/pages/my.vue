<template>
<div class="wrapper">
  <mu-appbar class="header">
    <mu-icon-button icon="email" to="/Vue-app/src/pages/message" slot="right"/>
    <span class="my-news-title">个人中心</span>
  </mu-appbar>
  <mu-list class="main">
    <div class="my-information">
      <img :src="res.avatar_url" alt="">
      <div class="time">
        <p class="my-name">{{res.loginname}}</p>
        <p class="integral">积分：{{res.score}}</p>
        <p class="registration time">注册时间：{{res.create_at | formatDate }}</p>
      </div>
    </div>
    <!--话题-->
    <mu-list-item class="list-item" title="最近的话题" v-if="res.recent_topics" toggleNested :open="false">
      <mu-icon slot="left" value="chat" class="chat_icon"/>
      <mu-list-item class="list-item-content" :to="{path: '/Vue-app/src/pages/content', query:{id:item.id}}" v-for="item in res.recent_topics" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at | formatDate">
        <mu-icon slot="left" value="hdr weak"></mu-icon>
      </mu-list-item>
      <span class="res-number">
        {{res.recent_topics.length}}
      </span>
    </mu-list-item>
    <!--最近的回复-->
    <mu-list-item class="list-item" title="最近的回复" v-if="res.recent_replies" toggleNested :open="false">
      <mu-icon slot="left" value="public" class="chat_icon"></mu-icon>
      <mu-list-item class="list-item-content" :to="{path: '/Vue-app/src/pages/content', query:{id:item.id}}" v-for="item in res.recent_replies" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at | formatDate">
        <mu-icon slot="left" value="hdr weak"></mu-icon>
      </mu-list-item>
      <span class="res-number">{{res.recent_replies.length}}</span>
    </mu-list-item>
    <!--收藏的话题-->
    <mu-list-item class="list-item" title="收藏的话题" v-if="res.collect_topics" toggleNested :open="false">
      <mu-icon slot="left" value="star" class="chat_icon"></mu-icon>
      <mu-list-item class="list-item-content" :to="{path: '/Vue-app/src/pages/content', query:{id:item.id}}" v-for="item in res.collect_topics" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at | formatDate">
        <mu-icon slot="left" value="hdr weak"></mu-icon>
      </mu-list-item>
      <span class="res-number">{{res.collect_topics.length}}</span>
    </mu-list-item>
    <!--退出登录-->
    <div class="logout">
      <mu-raised-button label="退出登录" @click="logout" class="logout-button" primary/>
    </div>
  </mu-list>
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
  // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
  created () {
    this.accesstoken = localStorage.getItem('accesstoken')
    this.getData()
  },
  methods: {
    getData () {
      let that = this
      axios.post('https://www.vue-js.com/api/v1/accesstoken', {
        accesstoken: that.accesstoken
      })
        .then(function (response) {
          that.user = response.data
          that.getUserData()
        })
    },
    // 根据用户登录名和get方法取得用户信息
    getUserData () {
      let that = this
      axios.get('https://www.vue-js.com/api/v1/user/' + that.user.loginname).then(function (response) {
        that.res = response.data.data
        console.log(that.res)
      })
    },
    // 登出并清除缓存
    logout () {
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('user_id')
      localStorage.removeItem('loginname')
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  height 100%
  position relative
.header
  /*position absolute*/
  width 100%
  text-align center
.my-news-title
  padding-left: 2.5rem;

.my-information
  height 6rem
  padding-top .5rem

  img
    float left
    height 5rem
    width 5rem
    margin-left 1rem
  .time
    float left
    p
      margin-left 1rem
    .my-name
      font-size 1.4rem
      font-weight bold
      padding-bottom .2rem
    .integral
      padding-bottom .2rem
.list-item
  padding-top 1rem
.res-number
  background-color: #f5f5f5;
  font-size: 2rem block;
  padding: 0 0.3rem;
  border-radius: 100%;
  position: absolute;
  right: 4rem;
  top: .8rem;
.chat_icon
  font-size 1.5rem
  font-weight bold
.logout
  text-align center
  .logout-button
    margin-top 2rem
</style>
