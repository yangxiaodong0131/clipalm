const state = {
  activeTab: -1,
  menu: 'MDC',
  mdcRule: [],
  adrgRule: [],
  drgRule: [],
  icd9Rule: [],
  icd10Rule: []
}

const mutations = {
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_mdc_rule (state, x) {
    state.mdcRule = x
  },
  SET_adrg_rule (state, x) {
    state.adrgRule = x
  },
  SET_drg_rule (state, x) {
    state.drgRule = x
  },
  SET_icd9_rule (state, x) {
    state.icd9Rule = x
  },
  SET_icd10_rule (state, x) {
    state.icd10Rule = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_activeTab')
    commit('SET_mdc_rule')
    commit('SET_adrg_rule')
    commit('SET_drg_rule')
    commit('SET_icd9_rule')
    commit('SET_icd10_rule')
  }
}

export default {
  state,
  mutations,
  actions
}
