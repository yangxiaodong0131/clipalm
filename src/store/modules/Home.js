const state = {
  visible: false,
  activeTab: -1,
  menus: [],
  menu: ['用户登陆', '数据展示', '数据展示', '数据展示', '数据展示'],
  notice: '未注册用户！',
  user: { login: false, data: {} },
  details: [],
  gridList: [],
  buttonText: '',
  isBottomShow: false,
  isInfoButtonShow: false,
  info: '',
  infoTitle: '',
  lastPages: []
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
  SET_isInfoButtonShow (state, x) {
    state.isInfoButtonShow = x
  },
  SET_info (state, x) {
    state.info = x
  },
  SET_infoTitle (state, x) {
    state.infoTitle = x
  },
  SET_lastPages (state, x) {
    // x = [menu, type]
    if (x[1] === 'filter') {
      state.lastPages = state.lastPages.filter(i => i !== x[0])
    } else if (x[1] === 'push' && !state.lastPages.includes(x[0])) {
      state.lastPages.push(x[0])
    }
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
    commit('SET_isInfoButtonShow')
    commit('SET_info')
    commit('SET_infoTitle')
    commit('SET_lastPages')
  }
}

export default {
  state,
  mutations,
  actions
}
