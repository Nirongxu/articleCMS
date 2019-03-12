import store from '../index'
export default {
  state: {
    info: {}  // 每次刷新都要通过token请求个人信息来筛选动态路由
  },
  mutations: {
    getInfo (state, token) {
      // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
      debugger
      state.info = {
        role: 'superAdmin',
        // permissions: '超级管理员',
        name: '夏洛克丶旭1',
        avatar: './static/images/icon.jpg'
      }
      sessionStorage.setItem('info', JSON.stringify(store.getters.info))
    }
  },
  actions: {
    getInfo ({commit}, token) {
      commit('getInfo', token)
    },
    // setRole ({commit}, options){
    //   // 权限测试
    //   commit('setRole', options)
    // }
  }
}
