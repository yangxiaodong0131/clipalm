import { getDetails } from './details'
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const urlConfig = require('./config.js')
const qs = require('qs')

export function getServer (obj, activeTab, menu, value = null) {
  // activeTab:页面
  // menu:判断查询菜单
  // value:查询条件
  let version = ''
  let year = ''
  let url = ''
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
    default:
      version = 'BJ'
      break
  }
  if (obj.$store.state.Home.user.data.clipalm_year) {
    year = obj.$store.state.Home.user.data.clipalm_year
  } else {
    year = '2017'
  }
  if (value === null) {
    switch (menu) {
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
      case 'MDC':
        url = `rule_bj_mdc?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'ICD9':
        url = `rule_bj_icd9?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'ICD10':
        url = `rule_bj_icd10?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case '统计分析(字母增序)':
        url = `wt4_stat_cv?plat=client&order=code&page=${obj.$store.state.Stat.statPage}`
        break
      case '统计分析(费用CV降序)':
        url = `wt4_stat_cv?plat=client&order=cv&page=${obj.$store.state.Stat.statPage}`
        break
      case '统计分析(平均费用增序)':
        url = `wt4_stat_cv?plat=client&order=fee&page=${obj.$store.state.Stat.statPage}`
        break
      case '帖子列表':
        url = `forum?plat=client&lable=&page=${obj.$store.state.Forum.forumPage}`
        break
    }
  } else {
    switch (menu) {
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&page=1&mdc=${value.mdc}&version=${version}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&page=1&adrg=${value.code}&version=${version}`
        break
      case 'statInfo':
        url = `wt4_stat_cv?plat=client&order=code&drg=${value}`
        break
      case '帖子列表':
        url = `forum?plat=client&lable=${value.b_wt4_v1_id}&page=${obj.$store.state.Forum.forumPage}`
        break
      case '帖子':
        url = `forum?id=${value.id}`
        break
    }
  }
  if (url) {
    // 先取storage
    storage.getItem(url, e => {
      if (e.result === 'success!') {
        const edata = JSON.parse(e.data)
        setStore(obj, menu, 'type', edata)
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
            storage.setItem(url, JSON.stringify(res.data))
            setStore(obj, activeTab, menu, res.data)
          } else {
            obj.$store.commit('SET_isLoadingShow', false)
            modal.toast({ message: '- 网络连接失败 -', duration: 1 })
          }
        })
      }
    })
  }
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

export function createForum (obj, forum, type, activeTab) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/forum`,
    body: qs.stringify(forum)
  }, res => {
    if (res.ok) {
      switch (type) {
        case 'reply':
          modal.toast({ message: '回复成功', duration: 1 })
          obj.$store.commit('SET_menu', [activeTab, '帖子'])
          console.log(activeTab)
          getServer(obj, activeTab, '帖子', res.data)
          break
        default:
          obj.$store.commit('SET_menu', [activeTab, '帖子列表'])
          obj.$store.commit('SET_post', [])
          obj.$store.commit('SET_forumPage', 1)
          modal.toast({ message: '帖子创建成功', duration: 1 })
          getServer(obj, activeTab, '帖子列表', obj.$store.state.Home.menu[activeTab])
      }
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}

function setStore (obj, activeTab, menu, rdata) {
  let data = []
  switch (activeTab) {
    case 1:
      switch (menu) {
        case 'statInfo':
          obj.$store.commit('SET_infoLevel', 2)
          const details = getDetails('分析详情', rdata.data[0])
          obj.$store.commit('SET_info', details)
          break
        default:
          data = obj.$store.state.Edit.wt4Case
          data = data.concat(rdata.data)
          obj.$store.commit('SET_wt4Info', rdata.info)
          obj.$store.commit('SET_wt4Case', data)
          break
      }
      break
    case 2:
      data = obj.$store.state.Library.rule
      data = data.concat(rdata.data)
      obj.$store.commit('SET_rule', rdata.data)
      break
    case 3:
      data = obj.$store.state.Stat.statDrg
      data = data.concat(rdata.data)
      obj.$store.commit('SET_statDrg', rdata.data)
      break
    case 4:
      switch (menu) {
        case '帖子列表':
          obj.$store.commit('SET_post', rdata.data)
          break
        case '帖子':
          console.log(rdata.data[0])
          obj.$store.commit('SET_forumContent', rdata.data[0])
          break
      }
      break
  }
  obj.$store.commit('SET_isLoadingShow', false)
}
