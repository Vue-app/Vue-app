<template>
  <div class="wrapper">
    <mu-appbar class="header">
      <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
      <mu-icon-button  icon="email" to="/vue-app/dist/message" slot="right" />
      <p class="my-news-title">个人中心</p>
    </mu-appbar>
    <mu-list class="main">
      <div class="my-information">
        <img :src="peopleUsg.avatar_url" alt="user">
        <div class="timer">
          <span class="name"><b>{{peopleUsg.loginname}}</b></span><br>
          <span>积分：{{peopleUsg.score}}</span><br>
          <span>注册时间：{{peopleUsg.create_at | formatDate }}</span>
        </div>
      </div>
      <mu-list-item class="my-information-firstitem list-item" title="最近的话题" v-if="peopleUsg.recent_topics" toggleNested :open="false">
        <mu-icon slot="left" value="chat" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-app/src/pages/content',query:{id:item.id}}" v-for="item in peopleUsg.recent_topics" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{peopleUsg.recent_topics.length}}</span>
      </mu-list-item>
      <mu-list-item class="list-item" v-if="peopleUsg.recent_replies" title="最近的回复" toggleNested :open="false">
        <mu-icon slot="left" value="public" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-app/src/pages/content',query:{id:item.id}}" v-for="item in peopleUsg.recent_replies" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{peopleUsg.recent_replies.length}}</span>
      </mu-list-item>
      <mu-list-item class="list-item" v-if="peopleUsg.collect_topics" title="收藏的话题" toggleNested :open="false">
        <mu-icon slot="left" value="star" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-app/src/pages/content',query:{id:item.id}}" v-for="item in peopleUsg.collect_topics" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{peopleUsg.collect_topics.length}}</span>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        accesstoken: '',
        user: {},
        peopleUsg: {}
      }
    },
    created () {
      this.accesstoken = localStorage.getItem('accesstoken')
      this.getData()
    },
    methods: {
      getData () {
        let authorName = this.$route.query.user
        let url = 'https://www.vue-js.com/api/v1/user/' + authorName
        axios.get(url).then((response) => {
          this.peopleUsg = response.data.data
          console.log(response.data.data)
        })
      },
      goback () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .wrapper
    .header
      position fixed
      height 4rem
      top 0
    .my-news-title
      text-align center
    .main
      padding 5rem 1rem 0
      .my-information
        width 100%
        overflow hidden
        img
          width 4rem
          height 4rem
          float left
        .timer
          padding-left 2rem
          float left
    .list-item-content
      border-bottom 1px solid #eee
    .list-item-content:nth-child(1)
      border-top 1px solid #eee
</style>
