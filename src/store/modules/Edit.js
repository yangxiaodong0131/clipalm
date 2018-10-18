const state = {
  activeTab: -1,
  menu: '病案',
  wt4Case: []
}

const mutations = {
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_wt4Case (state, x) {
    state.wt4Case = x
    console.log(state.wt4Case)
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_activeTab')
    commit('SET_wt4Case')
  }
}

export default {
  state,
  mutations,
  actions
}
