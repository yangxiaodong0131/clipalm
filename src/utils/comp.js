const stream = weex.requireModule('stream')
// const urlConfig = require('./config.js')
const qs = require('qs')
export function compDrg (obj, wt4) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `127.0.0.1:3001/comp_drg`,
    body: qs.stringify({ params: wt4 })
  }, res => {
    if (res.ok) {
      console.log(res.data)
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}
