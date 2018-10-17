const state = {
  activeTab: -1,
  menu: '机构',
  statDrg: []
}

const mutations = {
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_statDrg (state, x) {
    state.statDrg = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_activeTab')
    commit('SET_statDrg')
  }
}

export default {
  state,
  mutations,
  actions
}
