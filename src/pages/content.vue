<template>
  <div class="wrapper">
    <mu-appbar class="header" :title="data.title">
      <mu-icon-button @click="goback" icon="arrow_back" slot="left" to="/" />
        <mu-icon-menu icon="more_vert" slot="right">
          <mu-menu-item title="顶部" href="#contentTip"></mu-menu-item>
          <mu-menu-item title="评论区" href="#commentsMain"></mu-menu-item>
          <mu-menu-item title="写评论" href="#commentsInput"></mu-menu-item>
          <mu-menu-item title="返回首页" href="/"></mu-menu-item>
        </mu-icon-menu>
    </mu-appbar>
    <div class="main">
      <div class="content-tip" id="contentTip">
        <span v-if="data.top">置顶</span>
        <span v-else-if="data.good">精华</span>
        <span v-else-if="data.tab === 'share'" :style="styleObj">分享</span>
        <span v-else-if="data.tab === 'ask'" :style="styleObj">问答</span>
        <span v-else-if="data.tab === 'fob'" :style="styleObj">招聘</span>
        <strong>{{data.title}}</strong>
      </div>
      <div class="content-about">
        <router-link :to="{path:'/vue-app/src/pages/people',query:{user:data.author.loginname}}" alt="user">
          <img class="content-author-pic" :src="data.author.avatar_url" alt="">
        </router-link>
        <span>作者: {{data.author.loginname}}</span>
        <span>发表时间: {{data.create_at | formatDate}}</span> <br/>
        <span>最后回复: {{data.last_reply_at | formatDate}}</span>
        <span>浏览量: {{data.visit_count}}</span>
      </div>
      <div class="collect">
        <mu-checkbox v-if="accesstoken" v-model="collect" :label="collectText" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" />
      </div>
      <div class="content-text" v-html="data.content"></div>
      <ul  id="commentsMain" class="comments-main">
        <li class="comments-num">{{data.replies.length}}条评论</li>
        <li v-for="(list,index) in data.replies" :key="list.id">
          <router-link :to="{path:'/vue-app/src/pages/people',query:{user:list.author.loginname}}" alt="user">
            <img v-if="list.author" :src="list.author.avatar_url" alt="">
          </router-link>
          <strong>{{list.author.loginname}}</strong>
          <span class="comments-people-ups">
            <mu-icon @click="good(index)" value="thumb_up" :size="16" color="#a9a9a9"/> {{list.ups.length}}
          </span>
          <span class="comments-peopele-time">{{list.create_at | formatDate}}
          </span>
          <mu-icon @click="commentReply(index)" class="textsms" value="textsms" :size="16" color="#a9a9a9" />
          <p v-html="list.content"></p>
          <div v-if="accesstoken" v-show="list.reply_show" class="comment-reply">
            <mu-text-field v-model="commentReplyText" class="comment-reply-text" hintText="请输入评论" multiLine :rews="2" :rowMax="6" fullWidth/>
            <mu-raised-button @click="commentReplyOn(index)" label="确认" class="demo-raised-button" primary/>
            <mu-raised-button @click="commentReplyOf(index)" label="取消" class="demo-raised-button" primary/>
          </div>
        </li>
      </ul>
      <div class="comments-input" id="commentsInput">
        <mu-text-field v-model="commentText" hintText="这里输入评论内容" multiLine :rews="3" :rowsMax="6" />
        <mu-raised-button @click="commentOn" label="评论" class="demo-raised-button" primary/>
      </div>
      <mu-toast v-if="!accesstoken" message="点赞评论及收藏请先登录" />
      <mu-toast v-if="commentSuccess" message="评论成功!!" @close="" />
      <mu-toast v-if="commentFalse" message="评论失败!!" @close="" />
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        accesstoken: '',
        styleObj: {
          backgroundColor: '#999'
        },
        data: {
          author: {},
          replies: {}
        },
        user_id: '',
        loginname: '',
        collect: false,
        collectText: '收藏',
        commentReplyText: '',
        commentText: '',
        commentSuccess: false,
        commentFalse: false
      }
    },
    created () {
      this.accesstoken = localStorage.getItem('accesstoken')
      this.user_id = localStorage.getItem('user_id')
      this.loginname = localStorage.getItem('loginname')
      this.getData()
      this.hasCollected()
    },
    watch: {
      collect: function (newVal) {
        if (newVal) {
          this.collectOn()
          this.collectText = '取消收藏'
        } else {
          this.collectOff()
          this.collectText = '收藏'
        }
      }
    },
    methods: {
      getData () {
        let id = this.$route.query.id
        axios.get('https://www.vue-js.com/api/v1/topic/' + id).then((response) => {
          this.data = response.data.data
          console.log(this.data)
        })
      },
      goback () {
        this.$router.go(-1)
      },
      good (index) {
        if (!this.accesstoken) return
        let replyId = this.data.replies[index].id
        axios.post('https://www.vue-js.com/api/v1/reply/' + replyId + '/ups', {
          accesstoken: this.accesstoken
        }).then((response) => {
          console.log(response)
          this.getData()
        })
      },
      commentReply (index) {
        this.data.replies[index].reply_show = true
        this.commentReplyText = '@' + this.data.replies[index].author.loginname + ' '
      },
      commentReplyOn (index) {
        let id = this.$route.query.id
        axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies', {
          accesstoken: this.accesstoken,
          content: this.commentReplyText,
          reply_id: this.data.replies[index].id
        }).then((response) => {
          console.log(response)
          this.commentSuccess = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.commentSuccess = false
          }, 2000)
          this.getData()
        }).catch((error) => {
          console.log(error)
          this.commentFalse = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.commentFalse = false
          }, 2000)
        })
      },
      commentReplyOf (index) {
        this.commentReplyText = ''
        this.commentFalse = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => {
          this.commentFalse = false
        }, 2000)
        this.data.replies[index].reply_show = false
      },
      commentOn () {
        let id = this.$route.query.id
        axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies', {
          accesstoken: this.accesstoken,
          content: this.commentText
        }).then((response) => {
          console.log(response)
          this.commentSuccess = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.commentSuccess = false
          }, 2000)
          this.getData()
          this.commentText = ''
        }).catch((error) => {
          console.log(error)
          this.commentFalse = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => {
            this.commentFalse = false
          }, 2000)
        })
      },
      hasCollected () {
        if (this.accesstoken) {
          axios.get('https://www.vue-js.com/api/v1/user/' + this.loginname).then((response) => {
            console.log(response.data.data)
            let collecting = response.data.data.collect_topics
            let thisId = this.data.id
            collecting.find(function (item) {
              if (item.id === thisId) {
                this.collect = true
              }
            })
          })
        }
      },
      collectOn () {
        axios.post('https://www.vue-js.com/api/v1/topic/collect', {
          accesstoken: this.accesstoken,
          topic_id: this.data.id
        }).then((response) => {
          console.log(response)
        })
      },
      collectOff () {
        let that = this
        axios.post('https://www.vue-js.com/api/v1/topic/de_collect', {
          accesstoken: that.accesstoken,
          topic_id: that.data.id
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .wrapper
    .header
      position fixed
      top 0
    .main
      padding-top 4rem
      .content-tip
        position relative
        padding 1rem
        box-sizing border-box
        span
          background-color green
          color #fff
          padding 0.2rem
          border-radius .2rem
          font-size 1rem
          bottom 0.2rem
        strong
          font-size 1.2rem
      .content-about
        position relative
        border-top 1px solid #eee
        border-bottom 1px solid #eee
        height 5rem
        margin-bottom 1rem
        font-size 0.8rem
        color #95989d
        line-height 2rem
        text-align left
        span
          position relative
          padding-left 2rem
          top 0.5rem
          left 4rem
        .content-author-pic
          position absolute
          left 0.6rem
          border-radius 50%
          width 4rem
          height 4rem
          cursor pointer
          top 0.4rem
      .collect
        float right
        padding-right 2rem
      .content-text
        padding 1rem
      .comments-main
        list-style none
        padding 0 2rem
        border-top 1rem solid #eff2f7
        .comments-num
          border-left 0.3rem solid #fa8072
          font-size 1.2rem
          padding 0.4rem 0.6rem
        li
          position relative
          margin-top 0.5rem
          border-bottom 1px solid #eee
          img
            width 3rem
            border-radius 50%
            vertical-align middle
          i
            vertical-align middle
          .textsms, .comments-people-ups
            position absolute
            right 1rem
          .textsms
            bottom 0.5rem
          .comments-people-ups
            top 0.5rem
          p
            padding-right 2rem
      .comments-input
        padding 2rem 4rem 4rem
        text-align center
</style>
