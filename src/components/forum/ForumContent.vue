<template>
  <div class="container">
    <list class="list">
      <cell class="cell" v-for="(data, index) in datas" v-bind:key="index">
        <text class="type-text">Weex富文本混排方案：</text>
        <wxc-rich-text class="special-rich"
          :config-list="configList"></wxc-rich-text>
        <wxc-cell
          :label="`${index+1}#`"
          :title="data.content"
          :desc="data.username"
          :extraContent="data.datetime"
          @wxcCellClicked="returnContent(data, index+1)"
          :has-margin="true">
          <text class="red" slot="title">{{data.content}}</text>
        </wxc-cell>
        <div v-if="data.reply !== []" v-for="(reply, index) in data.reply" v-bind:key="`reply-${index}`">
          <wxc-cell
            :label="reply.content"
            :title="reply.content"
            :extraContent="`${reply.username}-${reply.datetime}`"
            :has-margin="true">
          </wxc-cell>
        </div>
        <div style="height:40px"> </div>
      </cell>
    </list>
    <div>
      <text v-if="textShow" style="font-size:35px;">{{text}}</text>
      <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" :autofocus=true value="" ></textarea>
      <wxc-button text="回复"
        class="submits"
        size="full"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>
    <mini-bar :title="menu"></mini-bar>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcRichText, WxcSpecialRichText } from 'weex-ui'
import MiniBar from '../common/MiniBar.vue'
import { createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcPopup, WxcCell, WxcButton, MiniBar, WxcRichText, WxcSpecialRichText },
  data () {
    return {
      configList: [{
        type: 'icon',
        src: 'https://gw.alicdn.com/tfs/TB1RRVWQXXXXXasXpXXXXXXXXXX-24-22.png'
      }, {
        type: 'text',
        value: '黄色主题',
        theme: 'yellow'
      }, {
        type: 'link',
        value: '自定义颜色link',
        href: 'https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js',
        style: {
          color: '#546E7A'
        }
      }, {
        type: 'icon',
        src: 'https://gw.alicdn.com/tfs/TB1qygJRXXXXXX2XFXXXXXXXXXX-117-37.png'
      }, {
        type: 'tag',
        value: '满100减20',
        theme: 'red'
      }, {
        type: 'tag',
        value: '自定义标签',
        style: {
          fontSize: 26,
          color: '#ffffff',
          borderColor: '#3d3d3d',
          backgroundColor: '#546E7A',
          height: 40
        }
      }],
      content: '',
      textShow: false,
      text: '',
      data: null
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    username () {
      return this.$store.state.Home.user.data.username
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    posts () {
      return this.$store.state.Forum.post
    },
    datas () {
      return this.$store.state.Forum.forumContent.content
    },
    forumIndex () {
      return this.$store.state.Forum.forumIndex
    }
  },
  methods: {
    oninput2 (event) {
      this.content = event.value
    },
    wxcButtonClicked () {
      let ForumContent = {}
      if (this.$store.state.Home.user.login && this.textShow === false) {
        ForumContent = { forum_id: this.$store.state.Forum.forumContent.id, content: this.content, username: this.$store.state.Home.user.data.username }
        createForum(this, { forum_all: { forum_content: ForumContent } }, 'reply', this.activeTab)
      } else if (this.$store.state.Home.user.login && this.textShow) {
        ForumContent = { sid: this.$store.state.Forum.forumContent.id, forum_content_id: this.data.id, content: this.content, username: this.$store.state.Home.user.data.username }
        createForum(this, { forum_all: { forum_content: ForumContent } }, 'reply', this.activeTab)
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    },
    returnContent (data, index) {
      // if (this.)
      this.data = data
      this.textShow = true
      this.text = `回复 ${index}#的${data.username}`
    }
  }
}
</script>
<style scoped>
.demo-title {
  font-size: 28px;
  background-color: #C6E2FF;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 14px;
  padding: 10px;
}
.container {
  width: 750px;
}
.list {
  margin-top: 91px;
}
</style>
