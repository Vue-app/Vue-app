import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  contentList: [],
  nomore: 1
}

const mutations = {
  getList (state, res) {
    state.contentList = res
  },
  pageList (state, res) {
    state.contentList = state.contentList.concat(res)
  },
  nomore (state, num) {
    state.nomore = num
  }
}

const actions = {
  getList ({commit}, url) {
    axios.get(url).then((response) => {
      console.log(response)
      commit('getList', response.data.data)
    })
  },
  pageList ({commit}, url) {
    axios.get(url).then((response) => {
      console.log(response)
      if (response.data.data.length === 0) {
        commit('nomore', 3)
        return
      } else {
        commit('pageList', response.data.data)
      }
    })
    commit('nomore', 1)
  },
  nomore ({commit}, num) {
    commit('nomore', num)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
