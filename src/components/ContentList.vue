<template>
  <div class="contentList">
    <div class="inloading" v-if="inloading">
      Loading...
    </div>
    <mu-list >
      <div class="list" v-for="(item,index) in items">
        <router-link :to="{path:'/vue-app/src/pages/people',query:{user:item.author.loginname}}" :src="item.author.avatar_url" tag="img" alt="user"></router-link>
      <router-link :to="{path:'/vue-app/src/pages/content',query:{id:item.id}}" tag="div" class="content" >
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
        <span>{{item.last_reply_at | formatDate }}</span>
      </div>
      </router-link>
      </div>
      <p class="nomore" v-if="nomore === 1" @click="loadMore">点击加载</p>
      <p class="nomore" v-else-if="nomore === 2">正在加载...</p>
      <p class="nomore" v-else="nomore">内容到底了</p>
    </mu-list>
    <div v-if="!items.length">
      <p>暂无话题</p>
    </div>
    <!--<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />-->
    <!--<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>-->
    </div>
</template>
<script>
  export default {
    name: 'ContentsList',
    data () {
      return {
        url: 'https://www.vue-js.com/api/v1/topics?tab=all',
        styleBg: {
          backgroundColor: '#c5c5c7'
        },
        activeTab: 'all',
        inloading: false,
        page: 1
      }
    },
    computed: {
      items () {
        return this.$store.state.contentList
      },
      nomore () {
        return this.$store.state.nomore
      }
    },
    created () {
      this.getData()
      this.$root.eventHub.$on('handleTabChange', (val) => {
        this.handleTabChange(val)
      })
    },
    activated () {
    },
    mounted () {
//      this.getData()
      console.log(this.$el)
    },
    methods: {
      handleTabChange (val) {
        this.page = 1
        this.$store.dispatch('nomore', 1)
        this.activeTab = val
        this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
        this.getData()
      },
      getData () {
        this.inloading = true
        this.$store.dispatch('getList', this.url)
        this.inloading = false
      },
      loadMore () {
        this.$store.dispatch('nomore', 2)
        if (this.nomore === 2 && !this.inloading) {
          console.log(1)
          this.page += 1
          let url = this.url + '&page=' + this.page
          this.$store.dispatch('pageList', url)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .contentList
    height 100%
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
  .nomore
    width 100%
    height 1rem
    line-height 1rem
    text-align center
</style>
