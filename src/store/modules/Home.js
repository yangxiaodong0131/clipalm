const state = {
  activeTab: 0,
  // 底部通知栏内容
  notice: '未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！',
  // 顶部导航栏选择
  navbar: '',
  // 页面工具栏选择
  // toolbar: '',
  // 初始化数据加载状态
  hasData: false,
  count: { cda: { user: '-', server: '-', block: '-' }, help: { user: '-', server: '-', block: '-' }, cdh: { user: '-', server: '-', block: '-' }, symptom: { user: '-', server: '-', block: '-' } },
  record: [],
  recordPage: 1,
  recordPageList: []
}

const mutations = {
  SET_activeTab (state, x) {
    state.activeTab = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_activeTab')
  }
}

export default {
  state,
  mutations,
  actions
}
