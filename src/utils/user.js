const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const urlConfig = require('./config.js')
const qs = require('qs')

export function analyse (obj) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/user_analyse`
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_userAnalyse', res.data)
    }
  })
}

export function userLogin (obj, user) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/login`,
    body: qs.stringify({ params: user })
  }, res => {
    if (res.ok) {
      if (res.data.login) {
        obj.$store.commit('SET_user', res.data)
        storage.setItem('user', JSON.stringify(user))
        obj.$store.commit('SET_menu_all', ['个人信息', '病案', '字典', 'DRG分析', '论坛'])
        butyingPoint(user)
      } else {
        obj.$store.commit('SET_user', { loginResult: '账号或密码错误', login: false, data: { clipalm_version: 'BJ编码版' } })
      }
    } else {
      obj.$store.commit('SET_user', { loginResult: '网络连接失败', login: false, data: { clipalm_version: 'BJ编码版' } })
    }
    if (!obj.$store.state.Home.user.login) {
      // 清空所有缓存
      storage.getAllKeys(event => {
        if (event.result === 'success') {
          event.data.map((key) => {
            storage.removeItem(key)
          })
        }
      })
      obj.$store.commit('SET_menu_all', ['用户登录', '介绍', '介绍', '介绍', '介绍'])
    }
  })
}

export function userLogout (obj) {
  obj.$store.commit('SET_menu_all', ['用户登录', '介绍', '介绍', '介绍', '介绍'])
  obj.$store.commit('SET_user', { loginResult: '', login: false, data: { clipalm_version: 'BJ编码版' } })
  // 清空所有缓存
  storage.getAllKeys(event => {
    if (event.result === 'success') {
      event.data.map((key) => {
        storage.removeItem(key)
      })
    }
  })
}

export function updateUser (obj, user) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/drg_admin_user_update`,
    body: qs.stringify({ drg_admin_user: user, id: obj.$store.state.Home.user.data.id })
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_userData', res.data.data)
      obj.$store.commit('SET_menu', [2, '字典'])
      obj.$store.commit('SET_onlyInfoLevel', [2, 0])
      obj.$store.commit('SET_menu', [1, '病案'])
      obj.$store.commit('SET_onlyInfoLevel', [1, 0])
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}

function butyingPoint (user) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/butying_point`,
    body: qs.stringify({ butying_point: {action_info: 'login', username: user.username, plat: 'clipalm'} })
  })
}
