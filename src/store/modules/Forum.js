const state = {
  type: '',
  post: [],
  forumPage: 1,
  forumHead: '',
  forumMenu: '',
  forumLabel: '',
  forumIndex: null,
  forumContent: {}
}

const mutations = {
  SET_forumIndex (state, x) {
    state.forumIndex = x
  },
  SET_forumHead (state, x) {
    state.forumHead = x
  },
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
    if (x) {
      state.forumMenu = x.title
    }
    state.forumContent = x
  },
  SET_forumLabel (state, x) {
    state.forumLabel = x
  },
  SET_forumMenu (state, x) {
    state.forumMenu = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumIndex')
    commit('SET_forumHead')
    commit('SET_forumType')
    commit('SET_post')
    commit('SET_forumPage')
    commit('SET_forumContent')
    commit('SET_forumMenu')
    commit('SET_forumLabel')
  }
}

export default {
  state,
  mutations,
  actions
}
