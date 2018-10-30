const state = {
  visible: false,
  activeTab: -1,
  menus: [],
  menu: ['用户登陆', '数据展示', '数据展示', '数据展示', '数据展示'],
  notice: '未注册用户！',
  user: { login: false, data: {} },
  isBottomShow: false,
  infoLevel: 0,
  infoMenu: '',
  infoPage1: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  infoPage2: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  infoPage3: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  infoPage4: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  isMiniShow: false,
  showForum: false
}

const mutations = {
  SET_visible (state, x) {
    state.visible = x
  },
  SET_showForum (state, x) {
    state.showForum = x
  },
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_menus (state, x) {
    if (!x.includes('论坛')) {
      state.showForum = false
    }
    state.menus = x
  },
  SET_menu (state, x) {
    state.menu.splice(x[0], 1, x[1])
  },
  SET_user (state, x) {
    state.user = x
  },
  SET_isBottomShow (state, x) {
    state.isBottomShow = x
  },
  SET_info (state, x) {
    switch (state.infoLevel) {
      case 1:
        state.infoPage1.info = x
        break
      case 2:
        state.infoPage2.info = x
        break
      case 3:
        state.infoPage3.info = x
        break
      case 4:
        state.infoPage4.info = x
        break
    }
  },
  SET_infoMenu (state, x) {
    state.infoMenu = x
  },
  SET_infoPageClear (state) {
    const clear = { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false }
    state.infoLevel = 0
    state.infoPage1 = clear
    state.infoPage2 = clear
    state.infoPage3 = clear
    state.infoPage4 = clear
  },
  SET_infoPage (state, x) {
    switch (state.infoLevel) {
      case 1:
        state.infoPage1 = x
        break
      case 2:
        state.infoPage2 = x
        break
      case 3:
        state.infoPage3 = x
        break
      case 4:
        state.infoPage4 = x
        break
    }
  },
  SET_infoLevel (state, x) {
    state.infoLevel = x
  },
  SET_isMiniShow (state, x) {
    state.isMiniShow = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_showForum')
    commit('SET_visible')
    commit('SET_activeTab')
    commit('SET_menus')
    commit('SET_menu')
    commit('SET_user')
    commit('SET_labelDetails')
    commit('SET_isBottomShow')
    commit('SET_info')
    commit('SET_infoMenu')
    commit('SET_infoPage')
    commit('SET_infoLevel')
    commit('SET_isMiniShow')
    commit('SET_infoPageClear')
  }
}

export default {
  state,
  mutations,
  actions
}
