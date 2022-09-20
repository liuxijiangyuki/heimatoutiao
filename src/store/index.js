import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 设置变量
    userPhoto: 'http://5b0988e595225.cdn.sohucs.com/images/20181021/60b0f4afc9524dd79376f5c91897630a.jpeg'
  },
  getters: {
  },
  mutations: {
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
