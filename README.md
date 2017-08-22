# vue-forum

> 构vue官方论坛 用vue社区提供的API，基于vue+vue-cli+vue-router+axios+webpack开发的vue论坛webapp

  UI用Muse-UI css用stylus

> 主要功能
- [ ] 首页列表
- [ ] 下拉加载
- [ ] 用户信息（点击头像）
- [ ] 主题内容
- [ ] 登录功能
- [ ] 收藏（取消收藏）主题
- [ ] 评论列表
- [ ] 点赞（取消点赞）功能
- [ ] 消息中心
- [ ] 个人中心
- [ ] 发表评论
- [ ] 回复评论
- [ ] 发布主题
- [ ] 左右侧滑
- [ ] 搜索功能
- [ ] 手机横竖屏
- [ ] vuex重构

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


解决footerNav 点击问题 让其执行一次

 mounted () {
    this.facthData()
  },
