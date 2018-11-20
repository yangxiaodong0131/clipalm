function caseInfo (result, data) {
  result.title = '病案详情'
  result.info = data
  if (data.log) {
    result.grid['分组日志'] = data.log.map((x) => {
      const obj = { date: '', desc: '', highlight: false, title: x }
      return obj
    })
  }
  result.details = [
    {'label': '入组DRG', 'title': 'drg', 'hasArrow': true},
    {'label': '病案ID', 'title': 'b_wt4_v1_id', 'hasArrow': false},
    {'label': '主要诊断编码', 'title': 'disease_code', 'hasArrow': false},
    {'label': '主要诊断名称', 'title': 'disease_name', 'hasArrow': false},
    {'label': '其他诊断', 'title': 'diags_code', 'hasArrow': false},
    {'label': '手术/操作', 'title': 'opers_code', 'hasArrow': false},
    {'label': '住院天数', 'title': 'acctual_days', 'hasArrow': false},
    {'label': '住院总费用', 'title': 'total_expense', 'hasArrow': false},
    {'label': '性别', 'title': 'gender', 'hasArrow': false},
    {'label': '年龄', 'title': 'age', 'hasArrow': false},
    {'label': '新生儿天数', 'title': 'sf0100', 'hasArrow': false},
    {'label': '新生儿体重', 'title': 'sf0102', 'hasArrow': false},
    {'label': '呼吸机使用时间', 'title': 'sf0104', 'hasArrow': false},
    {'label': '出院转归', 'title': 'sf0108', 'hasArrow': false}]
  return result
}
function statInfo (result, data, menu) {
  result.title = '分析详情'
  result.info = data
  if (data.stat) {
    result.showSubRule = true
    result.subRuleTitle = `${menu}列表`
    result.showSubRuleTitle = true
    result.subRule = data.stat.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: `${menu}分析`, all: x}
      return obj
    })
  }
  result.details = [
    {'label': '编码', 'title': 'code', 'hasArrow': false},
    {'label': '名称', 'title': 'desc', 'hasArrow': false},
    {'label': '费用变异系数', 'title': 'fee_cv', 'hasArrow': false},
    {'label': '时间变异系数', 'title': 'day_cv', 'hasArrow': false},
    {'label': '死亡风险等级', 'title': 'death_level', 'hasArrow': false},
    {'label': '权重', 'title': 'weight', 'hasArrow': false},
    {'label': '平均费用', 'title': 'fee_avg', 'hasArrow': false},
    {'label': '平均住院天数', 'title': 'day_avg', 'hasArrow': false},
    {'label': '病历数', 'title': 'num_sum', 'hasArrow': false}]
  return result
}
function mdcInfo (result, data) {
  result.title = `${data.code}规则详情`
  result.info = data
  if (data.adrg) {
    result.showSubRule = true
    result.showSubRuleTitle = true
    result.subRuleTitle = 'ADRG列表'
    result.subRule = data.adrg.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: 'ADRG', all: x}
      return obj
    })
  }
  if (data.icd9_aa) {
    result.grid['非QY小手术规则'] = data.icd9_aa.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  result.details = [
    {'label': '编码', 'title': 'code', 'hasArrow': false},
    {'label': '名称', 'title': 'desc', 'hasArrow': false},
    {'label': '年份', 'title': 'year', 'hasArrow': false},
    {'label': '版本', 'title': 'version', 'hasArrow': false}]
  return result
}
function adrgInfo (result, data) {
  result.title = `${data.code}规则详情`
  result.info = data
  if (data.drg) {
    result.showSubRule = true
    result.showSubRuleTitle = true
    result.subRuleTitle = 'DRG列表'
    result.subRule = data.drg.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: 'DRG', all: x}
      return obj
    })
  }
  if (data.icd10_aa) {
    result.grid['主要诊断规则'] = data.icd10_aa.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd10_bb) {
    result.grid['其他诊断规则'] = data.icd10_bb.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd9_aa) {
    result.grid['主要手术规则'] = data.icd9_aa.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd9_bb) {
    result.grid['其他手术规则'] = data.icd9_bb.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  result.details = [
    {'label': '编码', 'title': 'code', 'hasArrow': false},
    {'label': '名称', 'title': 'desc', 'hasArrow': false},
    {'label': '年份', 'title': 'year', 'hasArrow': false},
    {'label': '版本', 'title': 'version', 'hasArrow': false}]
  return result
}
function drgInfo (result, data) {
  result.title = `${data.code}规则详情`
  result.info = data
  result.details = [
    {'label': '编码', 'title': 'code', 'hasArrow': false},
    {'label': '名称', 'title': 'desc', 'hasArrow': false},
    {'label': '年份', 'title': 'year', 'hasArrow': false},
    {'label': '版本', 'title': 'version', 'hasArrow': false}]
  return result
}
function icd10Info (result, data) {
  result.title = 'ICD10规则详情'
  result.info = data
  if (data.adrg) {
    result.grid['ADRG规则'] = data.adrg.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  result.details = [
    {'label': '编码', 'title': 'code', 'hasArrow': false},
    {'label': '名称', 'title': 'desc', 'hasArrow': false},
    {'label': '年份', 'title': 'year', 'hasArrow': false},
    {'label': '版本', 'title': 'version', 'hasArrow': false},
    {'label': 'MCC', 'title': 'mcc', 'hasArrow': false},
    {'label': 'CC', 'title': 'cc', 'hasArrow': false}]
  return result
}
function icd9Info (result, data) {
  const gridList = {}
  gridList['ADRG规则'] = data.adrg.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result2 = {
    info: data,
    infoTitle: 'ICD9规则详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code', 'hasArrow': false},
      {'label': '名称', 'title': 'desc', 'hasArrow': false},
      {'label': '年份', 'title': 'year', 'hasArrow': false},
      {'label': '版本', 'title': 'version', 'hasArrow': false},
      {'label': '手术室手术', 'title': 'p_type', 'hasArrow': false}]
  }
  return result2
}
function compResultInfo (result, data) {
  const result2 = {
    info: data,
    infoTitle: '分组结果',
    isInfoButtonShow: false,
    buttonText: ``,
    details: [
      {'label': '入组DRG', 'title': 'drg', 'hasArrow': false},
      {'label': '分组日志', 'title': 'log', 'hasArrow': false}]
  }
  return result2
}
function icd (result, data, title) {
  result.title = title
  result.info = data
  if (data.icd) {
    result.showSubRule = true
    result.subRuleTitle = title
    result.subRule = data.icd.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: title, all: x}
      return obj
    })
  }
  return result
}
function dissect (result, data, title) {
  const infoList = data.dissect.map((x) => {
    const obj = {'label': '', 'title': x, 'hasArrow': true, menu: title, all: { name: x }}
    return obj
  })
  const result2 = {
    info: data,
    infoTitle: title,
    isInfoListShow: true,
    infoListTitle: '',
    isInfoListTitleShow: false,
    infoList: infoList,
    gridList: [],
    details: []
  }
  return result2
}

// const info = {
//   infoTitle: '',
//   isInfoButtonShow: false,
//   buttonText: '',
//   gridList: [],
//   details: []
// }

export function getDetails (menu, data) {
  let result = {info: {}, title: '', details: [], grid: {}, showSubRule: false, subRule: [], showSubRuleTitle: false, subRuleTitle: ''}
  if (data) {
    switch (menu) {
      case '病案详情':
        result = caseInfo(data)
        break
      case '单条分组':
        result = compResultInfo(data)
        break
      case '分析详情':
        result = statInfo(data, 'ADRG')
        break
      case 'MDC规则详情':
        result = mdcInfo(data)
        break
      case 'ADRG规则详情':
        result = adrgInfo(data)
        break
      case 'DRG规则详情':
        result = drgInfo(data)
        break
      case 'ADRG分析规则详情':
        result = statInfo(data, 'DRG')
        break
      case 'DRG分析规则详情':
        result = statInfo(data, '')
        break
      case 'BJ-ICD10':
        result = icd(data, 'ICD10亚目列表')
        break
      case 'GB-ICD10':
        result = icd(data, 'ICD10亚目列表')
        break
      case 'ICD10规则详情':
        result = icd10Info(data)
        break
      case 'ICD10亚目列表规则详情':
        result = icd(data, 'ICD10细目列表')
        break
      case 'ICD10细目列表规则详情':
        result = icd10Info(data)
        break
      case 'BJ-ICD9':
        result = icd(data, 'ICD9亚目列表')
        break
      case 'GB-ICD9':
        result = icd(data, 'ICD9亚目列表')
        break
      case 'ICD9亚目列表规则详情':
        result = icd(data, 'ICD9细目列表')
        break
      case 'ICD9细目列表规则详情':
        result = icd9Info(data)
        break
      case 'ICD9规则详情':
        result = icd9Info(data)
        break
      case '疾病分类/诊断术语':
        result = dissect(data, '诊断术语-部位')
        break
      case '诊断术语-部位规则详情':
        result = icd(data, '诊断术语-部位规则列表')
        break
      case '诊断术语-部位规则列表规则详情':
        result = icd10Info(data)
        break
      case '临床手术/操作术语':
        result = dissect(data, '操作术语-部位')
        break
      case '操作术语-部位规则详情':
        result = icd(data, '操作术语-部位规则列表')
        break
      case '操作术语-部位规则列表规则详情':
        result = icd9Info(data)
        break
      default:
        break
    }
  }
  console.log(result)
  return result
}
