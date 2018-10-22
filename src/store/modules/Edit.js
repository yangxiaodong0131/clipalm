const state = {
  wt4Case: [],
  editMenu: ''
}

const mutations = {
  SET_wt4Case (state, x) {
    state.wt4Case = x
  },
  SET_editMenu (state, x) {
    state.editMenu = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_wt4Case')
    commit('SET_editMenu')
  }
}

export default {
  state,
  mutations,
  actions
}
