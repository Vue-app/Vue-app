<template>
  <div class="demo-infinite-container HeaderTabs">
    <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
      <mu-tab value="all" title="全部"/>
      <mu-tab value="good" title="精华"/>
      <mu-tab value="weex" title="weex"/>
      <mu-tab value="share" title="分享"/>
      <mu-tab value="ask" title="问答"/>
      <mu-tab value="job" title="招聘"/>
    </mu-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeTab: 'all'
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        console.log(val)
        this.$root.eventHub.$emit('handleTabChange', val)
      }
    }
  }
</script>
<style scoped>
  .tabs {
    margin-top: 4rem;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
  }
</style>
