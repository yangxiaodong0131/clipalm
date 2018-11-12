const state = {
  // type: '',
  post: [],
  forumPage: 1,
  forumCategory: '',
  forumLabel: '',
  forumIndex: null,
  forumContent: {}
}

const mutations = {
  SET_forumIndex (state, x) {
    state.forumIndex = x
  },
  SET_forumCategory (state, x) {
    state.forumCategory = x
  },
  SET_post (state, x) {
    state.post = x
  },
  SET_forumPage (state, x) {
    state.forumPage = x
  },
  SET_forumContent (state, x) {
    state.forumContent = x
  },
  SET_forumLabel (state, x) {
    state.forumLabel = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumIndex')
    commit('SET_forumCategory')
    commit('SET_post')
    commit('SET_forumPage')
    commit('SET_forumContent')
    commit('SET_forumLabel')
  }
}

export default {
  state,
  mutations,
  actions
}
