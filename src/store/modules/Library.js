const state = {
  rule: [],
  page: 1,
  libraryMenu: '',
  mdc: ''
}

const mutations = {
  SET_rule (state, x) {
    state.rule = x
  },
  SET_libraryPage (state, x) {
    state.page = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_rule')
    commit('SET_libraryPage')
  }
}

export default {
  state,
  mutations,
  actions
}
