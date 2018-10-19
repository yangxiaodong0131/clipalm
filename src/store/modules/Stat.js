const state = {
  statDrg: []
}

const mutations = {
  SET_statDrg (state, x) {
    state.statDrg = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_statDrg')
  }
}

export default {
  state,
  mutations,
  actions
}
