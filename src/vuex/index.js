import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import role from './modules/role'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get('access_token')
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set('access_token', token ,{ expires: 7 });
    }
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit('setToken', token)
        resolve()
      })
    }
  },
  getters: {
    token: state => state.token,
    info: state => state.role.info,
    logoShow: state => state.layout.logoShow,
    isCollapse: state => state.layout.isCollapse,
    uniquerouter: state => state.layout.uniquerouter,
    tabnavBox: state => state.layout.tabnavBox,
    visible: state => state.layout.visible,
    left: state => state.layout.left,
    top: state => state.layout.top,
    rightNav: state => state.layout.rightNav,
  },
  modules: {
    role
  }
})

export default store
