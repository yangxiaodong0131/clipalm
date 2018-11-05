const state = {
  statDrg: [],
  statMenu: ''
}

const mutations = {
  SET_statDrg (state, x) {
    state.statDrg = x
  },
  SET_statMenu (state, x) {
    state.statMenu = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_statDrg')
    commit('SET_statMenu')
  }
}

export default {
  state,
  mutations,
  actions
}
