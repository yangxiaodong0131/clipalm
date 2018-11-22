const details = [
  {'label': '编码', 'title': 'code', 'hasArrow': false},
  {'label': '名称', 'title': 'name', 'hasArrow': false},
  {'label': '年份', 'title': 'year', 'hasArrow': false},
  {'label': '版本', 'title': 'version', 'hasArrow': false},
  {'label': '手术室手术', 'title': 'p_type', 'hasArrow': false},
  {'label': '入组DRG', 'title': 'drg', 'hasArrow': false},
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
  {'label': '出院转归', 'title': 'sf0108', 'hasArrow': false},
  {'label': '费用变异系数', 'title': 'fee_cv', 'hasArrow': false},
  {'label': '时间变异系数', 'title': 'day_cv', 'hasArrow': false},
  {'label': '死亡风险等级', 'title': 'death_level', 'hasArrow': false},
  {'label': '权重', 'title': 'weight', 'hasArrow': false},
  {'label': '平均费用', 'title': 'fee_avg', 'hasArrow': false},
  {'label': '平均住院天数', 'title': 'day_avg', 'hasArrow': false},
  {'label': '病历数', 'title': 'num_sum', 'hasArrow': false},
  {'label': 'MCC', 'title': 'mcc', 'hasArrow': false},
  {'label': 'CC', 'title': 'cc', 'hasArrow': false},
  {'label': '手术室手术', 'title': 'p_type', 'hasArrow': false}]
function caseInfo (result, data) {
  result.title = '病案详情'
  result.info = data
  if (data.log) {
    result.grid['分组日志'] = data.log.map((x) => {
      const obj = { date: '', desc: '', highlight: false, title: x }
      return obj
    })
  }
  return result
}
function statInfo (result, data, menu) {
  result.title = '分析详情'
  if (data.stat && data.stat.length > 0) {
    result.showSubRule = true
    result.subRuleTitle = `${menu}列表`
    result.showSubRuleTitle = true
    result.subRule = data.stat.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: `${menu}分析`, all: x}
      return obj
    })
  }
  return result
}
function drgInfo (obj, result, data, title) {
  result.title = `${data.code}规则详情`
  if (data.adrgs) {
    result.showSubRule = true
    result.showSubRuleTitle = true
    result.subRuleTitle = 'ADRG列表'
    result.subRule = data.adrgs.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: 'ADRG', all: x}
      return obj
    })
  }
  if (data.icd9_a && title === 'MDC') {
    result.grid['非QY小手术规则'] = data.icd9_a.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.drgs) {
    result.showSubRule = true
    result.showSubRuleTitle = true
    result.subRuleTitle = 'DRG列表'
    result.subRule = data.drgs.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: 'DRG', all: x}
      return obj
    })
  }
  if (data.icd10_a && title === 'ADRG') {
    result.grid['主要诊断规则'] = data.icd10_a.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd10_b && title === 'ADRG') {
    result.grid['其他诊断规则'] = data.icd10_b.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd9_a && title === 'ADRG') {
    result.grid['主要手术规则'] = data.icd9_a.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd9_b && title === 'ADRG') {
    result.grid['其他手术规则'] = data.icd9_b.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  return result
}
function icdInfo (result, data, title) {
  result.title = `${title}规则详情`
  if (data.adrg) {
    result.grid['ADRG规则'] = data.adrg.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  return result
}
function compResultInfo (result, data) {
  result.title = '分组结果'
  return result
}
function subRule (result, data, title) {
  result.details = []
  result.title = title
  if (['诊断术语-部位', '操作术语-部位'].includes(title) && data.dissect) {
    result.showSubRule = true
    result.subRuleTitle = title
    result.subRule = data.dissect.map((x) => {
      const obj = {'label': '', 'title': x, 'hasArrow': true, menu: title, all: {name: x, mdc: data.mdc}}
      return obj
    })
  } else if (data.icd) {
    result.showSubRule = true
    result.subRuleTitle = title
    result.subRule = data.icd.map((x) => {
      const obj = {'label': x.code, 'title': x.name, 'hasArrow': true, menu: title, all: x}
      return obj
    })
  }
  return result
}
export function getDetails (obj, menu, data) {
  let result = {info: data, title: '', details: details, grid: {}, showSubRule: false, subRule: [], showSubRuleTitle: false, subRuleTitle: ''}
  if (data) {
    if (['BJ-ICD10', 'GB-ICD10'].includes(menu)) {
      menu = 'ICD10'
    } else if (['BJ-ICD9', 'GB-ICD9'].includes(menu)) {
      menu = 'ICD9'
    } else if (['BJ-ICD9', 'GB-ICD9'].includes(menu)) {
      menu = 'ICD9'
    }
    switch (menu) {
      case '病案详情':
        result = caseInfo(result, data)
        break
      case '单条分组':
        result = compResultInfo(result, data)
        break
      case 'MDC':
        result = drgInfo(obj, result, data, 'MDC')
        break
      case 'ADRG':
        result = drgInfo(obj, result, data, 'ADRG')
        break
      case 'DRG':
        result = drgInfo(obj, result, data, 'DRG')
        break
      case 'ICD10':
        result = subRule(result, data, 'ICD10亚目')
        break
      case 'ICD10亚目':
        result = subRule(result, data, 'ICD10细目')
        break
      case 'ICD10细目':
        result = icdInfo(result, data, 'ICD10')
        break
      case 'ICD9':
        result = subRule(result, data, 'ICD9亚目')
        break
      case 'ICD9亚目':
        result = subRule(result, data, 'ICD9细目')
        break
      case 'ICD9细目':
        result = icdInfo(result, data, 'ICD9')
        break
      case '疾病分类/诊断术语':
        result = subRule(result, data, '诊断术语-部位')
        break
      case '诊断术语-部位':
        result = subRule(result, data, 'ICD10细目')
        break
      case '临床手术/操作术语':
        result = subRule(result, data, '操作术语-部位')
        break
      case '操作术语-部位':
        result = subRule(result, data, 'ICD9细目')
        break
      case 'MDC分析':
        result = statInfo(result, data, 'ADRG')
        break
      case 'ADRG分析':
        result = statInfo(result, data, 'DRG')
        break
      case 'DRG分析':
        result = statInfo(result, data, '')
        break
    }
  }
  const detailsData = []
  result.details.map((x) => {
    if (result.info[x.title]) {
      detailsData.push(x)
    }
  })
  result.details = detailsData
  return result
}
