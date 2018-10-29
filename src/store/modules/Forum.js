const state = {
  type: '',
  post: [],
  forumPage: 1,
  forumContent: {}
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
  },
  SET_forumContent (state, x) {
    state.forumContent = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumType')
    commit('SET_post')
    commit('SET_forumPage')
    commit('SET_forumContent')
  }
}

export default {
  state,
  mutations,
  actions
}
