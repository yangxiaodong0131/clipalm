const state = {
  activeTab: -1,
  menu: 'MDC',
  rule: []
}

const mutations = {
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_rule (state, x) {
    state.rule = x
  },
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_activeTab')
    commit('SET_rule')
  }
}

export default {
  state,
  mutations,
  actions
}
