const state = {
  visible: false,
  activeTab: -1,
  menus: [],
  menu: ['用户登陆', '查询', 'MDC', '报表', '论坛'],
  notice: '未注册用户！',
  user: { login: false, data: {} },
  details: [],
  gridList: [],
  buttonText: '',
  isBottomShow: false,
  info: ''
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
  },
  SET_details (state, x) {
    state.details = x
  },
  SET_gridList (state, x) {
    state.gridList = x
  },
  SET_buttonText (state, x) {
    state.buttonText = x
  },
  SET_isBottomShow (state, x) {
    state.isBottomShow = x
  },
  SET_info (state, x) {
    state.info = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_visible')
    commit('SET_activeTab')
    commit('SET_menus')
    commit('SET_menu')
    commit('SET_user')
    commit('SET_labelDetails')
    commit('SET_gridList')
    commit('SET_buttonText')
    commit('SET_isBottomShow')
    commit('SET_info')
  }
}

export default {
  state,
  mutations,
  actions
}
