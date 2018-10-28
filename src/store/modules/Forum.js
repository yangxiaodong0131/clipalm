const state = {
  type: ''
}

const mutations = {
  SET_forumType (state, x) {
    state.type = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumType')
  }
}

export default {
  state,
  mutations,
  actions
}
