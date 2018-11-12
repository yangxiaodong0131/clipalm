const stream = weex.requireModule('stream')
const urlConfig = require('./config.js')
const qs = require('qs')
export function compDrg (obj, wt4, i) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:3001/comp_drg`,
    body: qs.stringify(wt4)
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_groupResult', res.data)
      obj.$store.commit('SET_menu', [i, '分组结果'])
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}
