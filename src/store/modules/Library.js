const state = {
  activeTab: -1,
  menu: 'MDC'
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
