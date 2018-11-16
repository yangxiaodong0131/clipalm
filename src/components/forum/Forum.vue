<template>
  <scroller class="container" v-bind:style="panel">
    <div class="div" style="height:20px"></div>
    <div v-if="showNew">
      <input class="input" type="text" placeholder="输入帖子标题" :autofocus=true value="" @input="oninput"/>
      <div class="wrapper">
        <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" :autofocus=true value="" ></textarea>
      </div>
      <wxc-button text="发布"
            size="full"
            class="submits"
            @wxcButtonClicked="sumbit"></wxc-button>
    </div>
    <wxc-button v-if="!showNew"
          text="发帖"
          size="full"
          class="submits"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    <div class="div" style="height:20px"></div>
    <div class="specialrich" v-for="(specialList, index) in specialConfigList" v-bind:key="index">
      <div class="panel2" @click="wxcRichTextLinkClick(index)">
        <wxc-rich-text :config-list="specialList"></wxc-rich-text>
      </div>
    </div>
    <mini-bar :title="menu"></mini-bar>
  </scroller>
</template>

<script>
import { WxcSpecialRichText, WxcButton, WxcRichText } from 'weex-ui'
import MiniBar from '../common/MiniBar.vue'
import { getServer, createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcSpecialRichText, WxcButton, WxcRichText, MiniBar },
  data: () => ({
    showNew: false,
    title: '',
    content: ''
  }),
  computed: {
    user () {
      return this.$store.state.Home.user
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    forumModule () {
      return this.$store.state.Forum.forumModule
    },
    posts () {
      return this.$store.state.Forum.post
    },
    forumLabel () {
      return this.$store.state.Forum.forumLabel
    },
    specialConfigList () {
      const configs = []
      this.posts.map((x) => {
        const config = [
          {
            type: 'tag',
            value: x.label,
            style: {
              fontSize: 34,
              color: '#3D3D3D',
              borderColor: '#FFC900',
              backgroundColor: '#FFC900',
              borderRadius: 14
            }
          },
          {
            type: 'text',
            value: x.title,
            theme: 'black',
            style: { fontSize: 35 }
          }
        ]
        configs.push(config)
      })
      return configs
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const i = this.$store.state.Home.activeTab
      if (this.posts.length === 0) {
        switch (this.menu) {
          case '我的帖子':
            getServer(this, i, '帖子列表', { username: this.user.data.username })
            break
          case '最新帖子':
            getServer(this, i, '帖子列表', { username: this.user.data.username })
            break
          default:
            getServer(this, i, '帖子列表', { module: this.menu })
            break
        }
      }
    },
    wxcRichTextLinkClick (i) {
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '帖子'])
      this.$store.commit('SET_forumIndex', i)
      getServer(this, this.activeTab, '帖子', this.posts[i])
    },
    oninput (event) {
      this.title = event.value
    },
    oninput2 (event) {
      this.content = event.value
    },
    wxcButtonClicked () {
      this.showNew = true
    },
    menuClicked (menu) {
      this.$store.commit('SET_forumModule', menu)
      // console.log(menu)
    },
    sumbit () {
      if (this.$store.state.Home.user.login) {
        const forum = { username: this.$store.state.Home.user.data.username, label: this.$store.state.Forum.forumLabel, title: this.title, module: this.forumModule }
        const ForumContent = { content: this.content, username: this.$store.state.Home.user.data.username }
        createForum(this, { forum_all: { forum: forum, forum_content: ForumContent } }, 'create', this.activeTab)
        this.showNew = false
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    }
  }
}
</script>

<style scoped>
.panel2 {
  width: 750px;
  background-color: #f2f3f4;
  font-size: 30px;
  border-style: solid;
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
.panel {
  margin-top: 140px;
}
.container {
  width: 750px;
  font-size: 30px;
}
.submits{
  position: relative;
  left: 23px;
  top: 1px;
}
.div {
  margin-top: 91px;
}
.input {
  font-size: 40px;
  height: 80px;
  width: 1250px;
  border-width: 1px;
  border-style: solid;
  border-color: #e3dbdb;
}
.textarea {
  font-size: 40px;
  width: 746px;
  height: 400px;
  margin-top: 50px;
  margin-left: 0px;
  padding-top: 20px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  color: #666666;
  border-width: 1px;
  border-style: solid;
  border-color: #e3dbdb;
}
</style>
