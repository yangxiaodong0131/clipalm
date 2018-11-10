const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const urlConfig = require('./config.js')
const qs = require('qs')

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
        obj.$store.commit('SET_menu', [0, '个人信息'])
        storage.setItem('user', JSON.stringify(res.data))
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
    }
  })
}

export function userLogout (obj) {
  obj.$store.commit('SET_menu', [0, '用户登录'])
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
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}
