const state = {
  statDrg: [],
  chartType: '报表',
  statPage: 1
}

const mutations = {
  SET_statDrg (state, x) {
    state.statDrg = x
  },
  SET_chartType (state, x) {
    state.chartType = x
  },
  SET_statPage (state, x) {
    state.statPage = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_statDrg')
    commit('SET_chartType')
    commit('SET_statPage')
  }
}

export default {
  state,
  mutations,
  actions
}
