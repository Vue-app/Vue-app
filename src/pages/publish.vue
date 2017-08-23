<template>
  <div class="wrapper">
    <mu-appbar class="header">
      <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
      <span>发布帖子</span>
    </mu-appbar>
    <div class="main">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="编辑" />
        <mu-tab value="tab2" title="预览" />
      </mu-tabs>
      <div v-if="activeTab === 'tab1'" class="tab1">
        <mu-text-field v-model="editorTitle" label="请写标题" fullWidth labelFloat/>
        <mu-select-field class="choose" v-model="tab" label="请选择板块" fullWidth :errorText="errorText">
          <mu-menu-item value="ask" title="回答" />
          <mu-menu-item value="share" title="分享" />
          <mu-menu-item value="job" title="招聘" />
        </mu-select-field>
        <mu-text-field v-model="editorText" label="正文" hintText="建议使用Markdown语法" multiLine :rows="10" :rowsMax="12" :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />
      </div>
      <!--预览-->
      <mu-flexbox-item v-html="markedText" v-if="activeTab === 'tab2'"></mu-flexbox-item>
      <!--确认发布-->
      <div class="publishBtn">
        <mu-raised-button @click="publishText" label="发布" class="release-button" primary/>
      </div>
    </div>

    <!--操作提示 未登录-->
    <mu-dialog :open="!accesstoken" title="温馨提示：">
      请先登录
      <mu-flat-button slot="actions" primary to="/" label="取消"/>
      <mu-flat-button slot="actions" primary to="/Vue-app/src/pages/login" label="确定"/>
    </mu-dialog>


  </div>
</template>
<script>
  import axios from 'axios'
  import marked from 'marked'
  export default {
    components: {
      axios
    },
    data () {
      const list = []
      return {
//        mu插件样式控制红线切换
        activeTab: 'tab1',
        accesstoken: '',
        list,
        tab: 'ask',
        editorTitle: '',
        editorText: '',
        tipMsg: '',
        publish: false
      }
    },
    created () {
      this.accesstoken = localStorage.getItem('accesstoken')
    },
    computed: {
      errorText () {
        return this.tab ? '' : '必选项'
      },
      markedText () {
        return marked(this.editorText)
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      goback () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="stylus" scoped>
.header
  text-align center
  span
    padding-right 2.5rem
</style>
