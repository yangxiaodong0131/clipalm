const state = {
  type: '',
  post: [],
  forumPage: 1
}

const mutations = {
  SET_forumType (state, x) {
    state.type = x
  },
  SET_post (state, x) {
    state.post = x
  },
  SET_forumPage (state, x) {
    state.forumPage = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumType')
    commit('SET_post')
    commit('SET_forumPage')
  }
}

export default {
  state,
  mutations,
  actions
}
