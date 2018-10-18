const state = {
  visible: false,
  activeTab: -1,
  menus: [],
  menu: ['用户登陆', '查询', 'MDC', '报表', '论坛'],
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
  SET_menus (state, x) {
    state.menus = x
  },
  SET_menu (state, x) {
    state.menu.splice(x[0], 1, x[1])
  },
  SET_user (state, x) {
    state.user = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_visible')
    commit('SET_activeTab')
    commit('SET_menus')
    commit('SET_menu')
    commit('SET_user')
  }
}

export default {
  state,
  mutations,
  actions
}
