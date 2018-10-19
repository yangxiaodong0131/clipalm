const state = {
  mdcRule: [],
  adrgRule: [],
  drgRule: [],
  icd9Rule: [],
  icd10Rule: [],
  icd10Page: 1,
  icd9Page: 1
}

const mutations = {
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
  },
  SET_icd10_page (state, x) {
    state.icd10Page = x
  },
  SET_icd9_page (state, x) {
    state.icd9Page = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_mdc_rule')
    commit('SET_adrg_rule')
    commit('SET_drg_rule')
    commit('SET_icd9_rule')
    commit('SET_icd10_rule')
    commit('SET_icd10_page')
    commit('SET_icd9_page')
  }
}

export default {
  state,
  mutations,
  actions
}
