import { getDetails } from './details.js'
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
      const index = obj.$store.state.Home.activeTab
      const menu = obj.$store.state.Home.menu[index]
      const result = getDetails(menu, res.data)
      obj.$store.commit('SET_groupResult', result)
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}
