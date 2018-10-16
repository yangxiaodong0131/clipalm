const state = {
  visible: false,
  activeTab: -1,
  menu: '用户登陆',
  notice: '未注册用户！',
  user: { login: false }
}

const mutations = {
  SET_visible (state, x) {
    state.visible = x
  },
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_menu (state, x) {
    state.menu = x
  },
  SET_user (state, x) {
    state.user = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_visible')
    commit('SET_activeTab')
    commit('SET_menu')
    commit('SET_user')
  }
}

export default {
  state,
  mutations,
  actions
}
