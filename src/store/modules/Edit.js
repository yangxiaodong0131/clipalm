const state = {
  wt4Case: []
}

const mutations = {
  SET_wt4Case (state, x) {
    state.wt4Case = x
    console.log(state.wt4Case)
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_wt4Case')
  }
}

export default {
  state,
  mutations,
  actions
}
