<template>
  <div class="contentList">
    <div class="inloading" v-if="inloading">
      Loading...
    </div>
    <div>
    <mu-list>
      <div class="list" v-for="(item,index) in items">
        <router-link to="#" :src="item.author.avatar_url" tag="img" alt="user"></router-link>
      <router-link to="#" tag="div" class="content" >
      <div class="list-title">
        <span v-if="item.top">置顶</span>
        <span v-else-if="item.good">精华</span>
        <span v-else-if="item.tab === 'share'" :style="styleBg">分享</span>
        <span v-else-if="item.tab === 'ask'">问答</span>
        <span v-else-if="item.tab === 'job'">招聘</span>
        <strong>{{item.title}}</strong>
      </div>
      <div class="timer">
        <span>
          <mu-icon value="chat" :size="14" />
          {{item.reply_count}} &nbsp;
          <mu-icon value="visibility" :size="14" />
          {{item.visit_count}}
        </span>
        <span>{{item.last_reply_at}}</span>
      </div>
      </router-link>
      </div>
      <p class="nomore" v-show="nomore">内容到底了</p>
    </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
    </div>
    <div v-if="!items.length">
      <p>暂无话题</p>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'ContentsList',
    data () {
      return {
        items: [],
        url: 'https://www.vue-js.com/api/v1/topics?tab=all',
        styleBg: {
          backgroundColor: '#c5c5c7'
        },
        loading: false,
        scroller: null,
        nomore: false,
        inloading: false,
        page: 1
      }
    },
    created () {
      this.getData()
    },
    mounted () {
      this.scroller = this.$el
      console.log(this.$el)
    },
    methods: {
      getData () {
        this.inloading = true
        axios.get(this.url).then((response) => {
          this.items = response.data.data
          this.inloading = false
        })
      },
      loadMore () {
        console.log(1)
        if (!this.nomore && !this.inloading) {
          this.loading = true
          this.page += 1
          let url = this.url + '&page=' + this.page
          setTimeout(() => {
            axios.get(url).then((response) => {
              let res = response.data.data
              if (res.length === 0) {
                this.loading = false
                this.nomore = true
                return
              }
              this.items = this.items.concat(res)
            })
            this.loading = false
          }, 1000)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .contentList
    padding 8rem 0 4rem
    overflow auto
  .list
    width 100%
    display flex
    border-bottom .6rem solid #eff2f7
    padding 1rem
    p
      text-align center
      color #666
    img
      width 3rem
      height 3rem
      margin-right 1rem
    .list-title
      span
        background-color #369219
        color #fff
        padding .1rem
        border-radius .2rem
        font-size 1rem
        margin-right .5rem
    .content
      width 100%
    .timer
      margin-top 10px
      width 100%
      overflow hidden
      i
        vertical-align middle
        margin-right .2rem
      span:nth-child(1)
        float left
      span:nth-child(2)
        float right
</style>
