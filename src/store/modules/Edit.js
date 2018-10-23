const state = {
  wt4Case: [],
  editMenu: '',
  wt4Page: 1
}

const mutations = {
  SET_wt4Case (state, x) {
    state.wt4Case = x
  },
  SET_editMenu (state, x) {
    state.editMenu = x
  },
  SET_wt4Page (state, x) {
    state.wt4Page = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_wt4Case')
    commit('SET_editMenu')
    commit('SET_wt4Page')
  }
}

export default {
  state,
  mutations,
  actions
}
