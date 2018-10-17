const stream = weex.requireModule('stream')
const urlConfig = require('../utils/config.js')
export function getDrgServerFile (obj, type, menu, value) {
  // type:判断查询全部还是单项
  // menu:判断查询drg类型（mdc、adrg…）
  // value:单项查询条件
  let url = null
  if (type === 'all') {
    switch (menu) {
      case 'MDC':
        url = 'rule_bj_mdc'
        break
      case 'ADRG':
        url = 'rule_bj_adrg'
        break
      case 'DRG':
        url = 'rule_bj_drg'
        break
      case 'ICD9':
        url = 'rule_bj_icd9'
        break
      case 'ICD10':
        url = 'rule_bj_icd10'
        break
      default:
    }
  } else if (type === 'adrgOne') {
    url = `rule_bj_adrg?mdc=${value.mdc}`
  } else if (type === 'drgOne') {
    url = `rule_bj_drg?adrg=${value.code}`
  }
  if (url) {
    stream.fetch({
      method: 'GET',
      type: 'json',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json',
      url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/${url}`
    }, res => {
      if (res.ok) {
        switch (menu) {
          case 'MDC':
            obj.$store.commit('SET_mdc_rule', res.data.data)
            break
          case 'ADRG':
            obj.$store.commit('SET_adrg_rule', res.data.data)
            break
          case 'DRG':
            obj.$store.commit('SET_drg_rule', res.data.data)
            break
          case 'ICD9':
            obj.$store.commit('SET_icd9_rule', res.data.data)
            break
          case 'ICD10':
            obj.$store.commit('SET_icd10_rule', res.data.data)
            break
          default:
            break
        }
      } else {
        obj.info = '- 网络连接失败 -'
      }
    })
  }
}
