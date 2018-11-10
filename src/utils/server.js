const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const urlConfig = require('../utils/config.js')
const qs = require('qs')
const modal = weex.requireModule('modal')
export function getServer (obj, type, menu, value = null) {
  // type:判断查询全部还是单项
  // menu:判断查询drg类型（mdc、adrg…）
  // value:单项查询条件
  let version = 'BJ'
  switch (obj.$store.state.Home.user.data.clipalm_version) {
    case 'BJ编码版':
      version = 'BJ'
      break
    case 'CC编码版':
      version = 'CC'
      break
    case 'GB编码版':
      version = 'GB'
      break
    case '术语版':
      version = 'CN'
      break
  }
  let url = null
  if (type === 'all') {
    switch (menu) {
      case 'MDC':
        url = `rule_bj_mdc?plat=client&version=${version}&page=${obj.$store.state.Library.page}`
        break
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&version=${version}&page=${obj.$store.state.Library.page}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&version=${version}&page=${obj.$store.state.Library.page}`
        break
      case 'ICD9':
        url = `rule_bj_icd9?plat=client&page=${obj.$store.state.Library.page}&version=${version}`
        break
      case 'ICD10':
        url = `rule_bj_icd10?plat=client&page=${obj.$store.state.Library.page}&version=${version}`
        break
      case '统计分析(字母增序)':
        url = `wt4_stat_cv?plat=client&page=${obj.$store.state.Stat.statPage}`
        break
      case '统计分析(费用CV降序)':
        url = `wt4_stat_cv?plat=client&page=${obj.$store.state.Stat.statPage}&order=cv`
        break
      case '统计分析(平均费用增序)':
        url = `wt4_stat_cv?plat=client&page=${obj.$store.state.Stat.statPage}&order=fee`
        break
      case 'QY病历':
        url = `wt4_2017?plat=client&drg=QY&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '未入组病历':
        url = `wt4_2017?plat=client&drg=0000&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '低风险死亡病历':
        url = `wt4_2017?plat=client&drg=&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '费用异常病历':
        url = `wt4_2017?plat=client&cv=1&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '论坛':
        if (value) {
          url = `forum?plat=client&lable=${value.b_wt4_v1_id}&page=${obj.$store.state.Forum.forumPage}`
        } else {
          url = `forum?plat=client&lable=&page=${obj.$store.state.Forum.forumPage}`
        }
    }
  } else if (type === 'adrgOne') {
    url = `rule_bj_adrg?mdc=${value.mdc}&plat=client`
  } else if (type === 'drgOne') {
    url = `rule_bj_drg?adrg=${value.code}&plat=client`
  } else if (type === 'wt4') {
    url = 'wt4_2017?plat=client'
  } else if (type === 'statOne') {
    url = `wt4_stat_cv?plat=client&drg=${value}`
  } else if (type === 'forumOne') {
    url = `forum?id=${value.id}`
  }
  console.log(url)
  if (url) {
    // 先取storage
    storage.getItem(url, e => {
      if (e.result === 'success!') {
        const edata = JSON.parse(e.data)
        setStore(obj, menu, type, edata)
      } else {
        obj.$store.commit('SET_isLoadingShow', true)
        stream.fetch({
          method: 'GET',
          type: 'json',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          responseType: 'json',
          url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/${url}`
        }, function (res) {
          if (res.ok) {
            storage.setItem(url, JSON.stringify(res.data), e => {
              console.log('storage success')
            })
            setStore(obj, menu, type, res.data)
          } else {
            obj.$store.commit('SET_isLoadingShow', false)
            modal.toast({ message: '- 网络连接失败 -', duration: 1 })
          }
        })
      }
    })
  }
}

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

export function getLastVersion (obj) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/clipalm_last_version`
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_serverVersion', res.data)
    } else {
      obj.info = '- 网络连接失败 -'
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

export function createForum (obj, forum, type) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/forum`,
    body: qs.stringify(forum)
  }, res => {
    if (res.ok) {
      getServer(obj, 'all', '论坛')
      switch (type) {
        case 'reply':
          modal.toast({ message: '回复成功', duration: 1 })
          break
        default:
          obj.$store.commit('SET_showForum', true)
          obj.$store.commit('SET_menus', ['论坛', '自定义查询'])
          obj.$store.commit('SET_menu', [4, '论坛'])
          obj.$store.commit('SET_post', [])
          obj.$store.commit('SET_forumPage', 1)
          modal.toast({ message: '帖子创建成功', duration: 1 })
      }
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}

function setStore (obj, menu, type, rdata) {
  obj.$store.commit('SET_isLoadingShow', false)
  let data = []
  switch (menu) {
    case 'MDC':
      // obj.$store.commit('SET_library_menu', menu)
      // obj.$store.commit('SET_mdc_rule', rdata.data)
      // obj.$store.commit('SET_libraryPage', parseInt(rdata.page))
      obj.$store.commit('SET_rule', rdata.data)
      break
    case 'ADRG':
      // obj.$store.commit('SET_library_menu', menu)
      // data = obj.$store.state.Library.adrgRule
      // if (type === 'adrgOne') {
      //   data = rdata.data
      //   obj.$store.commit('SET_libraryPage', ['ADRG', 1])
      // } else {
      //   data = data.concat(rdata.data)
      // }
      obj.$store.commit('SET_libraryPage', parseInt(rdata.page))
      obj.$store.commit('SET_rule', rdata.data)
      // obj.$store.commit('SET_adrg_rule', data)
      break
    case 'DRG':
      // obj.$store.commit('SET_library_menu', menu)
      // data = obj.$store.state.Library.drgRule
      // if (type === 'adrgOne') {
      //   data = rdata.data
      //   obj.$store.commit('SET_libraryPage', ['DRG', 1])
      // } else {
      //   data = data.concat(rdata.data)
      // }
      obj.$store.commit('SET_libraryPage', parseInt(rdata.page))
      obj.$store.commit('SET_rule', rdata.data)
      // obj.$store.commit('SET_rule', data)
      break
    case 'ICD9':
      obj.$store.commit('SET_libraryPage', parseInt(rdata.page))
      obj.$store.commit('SET_rule', rdata.data)
      break
    case 'ICD10':
      obj.$store.commit('SET_libraryPage', parseInt(rdata.page))
      obj.$store.commit('SET_rule', rdata.data)
      break
    case 'icd10One':
      data = obj.$store.state.Library.icd10Rule
      obj.$store.commit('SET_libraryPage', ['ICD9', parseInt(rdata.page)])
      data = data.concat(rdata.data)
      obj.$store.commit('SET_icd10_rule', data)
      break
    case 'icd9One':
      data = obj.$store.state.Library.icd9Rule
      obj.$store.commit('SET_libraryPage', ['ICD9', parseInt(rdata.page)])
      data = data.concat(rdata.data)
      obj.$store.commit('SET_icd9_rule', data)
      break
    case '统计分析(字母增序)':
      data = obj.$store.state.Stat.statDrg
      obj.$store.commit('SET_statPage', parseInt(rdata.page))
      data = data.concat(rdata.data)
      obj.$store.commit('SET_statDrg', data)
      break
    case '统计分析(费用CV降序)':
      data = obj.$store.state.Stat.statDrg
      obj.$store.commit('SET_statPage', parseInt(rdata.page))
      data = data.concat(rdata.data)
      obj.$store.commit('SET_statDrg', data)
      break
    case '统计分析(平均费用增序)':
      data = obj.$store.state.Stat.statDrg
      obj.$store.commit('SET_statPage', parseInt(rdata.page))
      data = data.concat(rdata.data)
      obj.$store.commit('SET_statDrg', data)
      break
    case '未入组病历':
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case 'QY病历':
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case '低风险死亡病历':
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case '费用异常病历':
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case '论坛':
      obj.$store.commit('SET_post', rdata.data)
      break
    case '帖子':
      obj.$store.commit('SET_forumContent', rdata.data[0])
      break
    case 'info':
      if (rdata.data.length === 1) {
        obj.$store.commit('SET_info', rdata.data[0])
      }
      break
    default:
      break
  }
}
