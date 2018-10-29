const state = {
  type: '',
  title: ''
}

const mutations = {
  SET_forumType (state, x) {
    state.type = x
  },
  SET_title (state, x) {
    state.title = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumType')
    commit('SET_title')
  }
}

export default {
  state,
  mutations,
  actions
}
