const state = {
  activeTab: -1,
  menu: '账户'
}

const mutations = {
  SET_activeTab (state, x) {
    state.activeTab = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_activeTab')
  }
}

export default {
  state,
  mutations,
  actions
}
