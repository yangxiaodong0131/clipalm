import { getServer } from './server'
const modal = weex.requireModule('modal')
const stream = weex.requireModule('stream')
const urlConfig = require('./config.js')
const qs = require('qs')
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
          obj.$store.commit('SET_menu', [activeTab, '贴子'])
          getServer(obj, activeTab, '贴子', res.data)
          break
        default:
          obj.$store.commit('SET_menu', [activeTab, '贴子列表'])
          obj.$store.commit('SET_post', [])
          obj.$store.commit('SET_forumPage', 1)
          modal.toast({ message: '贴子创建成功', duration: 1 })
          const module = forum.forum_all.forum.module
          getServer(obj, activeTab, '贴子列表', { module: module })
      }
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}

export function deleteForum (obj, id) {
  stream.fetch({
    method: 'del',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/forum/${id}`
    // body: qs.stringify(forum)
  }, res => {
    if (res.ok) {
      console.log('===')
      // switch (type) {
      //   case 'reply':
      //     modal.toast({ message: '回复成功', duration: 1 })
      //     obj.$store.commit('SET_menu', [activeTab, '贴子'])
      //     getServer(obj, activeTab, '贴子', res.data)
      //     break
      //   default:
      //     obj.$store.commit('SET_menu', [activeTab, '贴子列表'])
      //     obj.$store.commit('SET_post', [])
      //     obj.$store.commit('SET_forumPage', 1)
      //     modal.toast({ message: '贴子创建成功', duration: 1 })
      //     const module = forum.forum_all.forum.module
      //     getServer(obj, activeTab, '贴子列表', { module: module })
      // }
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}
