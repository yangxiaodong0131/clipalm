<template>
  <div class="container">
    <list class="list">
      <div style="height:10px"></div>
      <cell>
        <div v-if="showNew">
          <input class="input" type="text" placeholder="输入帖子标题" value="" @input="oninput"/>
          <div class="wrapper">
            <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" value="" ></textarea>
          </div>
          <wxc-button text="发布"
                size="full"
                class="submits"
                @wxcButtonClicked="sumbit"></wxc-button>
        </div>
        <div v-if="!showNew">
          <wxc-button v-if="showNewButton"
                text="发帖"
                size="full"
                class="submits"
                @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        </div>
      </cell>
      <div style="height:10px"></div>
      <cell v-for="(post, index) in posts" v-bind:key="index">
        <div class="panel">
          <wxc-cell
            :label="post.username"
            :title="post.title"
            :extraContent="`${post.datetime}`"
            :has-margin="false"
            :has-vertical-indent="false"
            :has-arrow="true"
            @wxcCellClicked="wxcRichTextLinkClick(index)">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <mini-bar :title="title" rightIcon="home" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { WxcSpecialRichText, WxcButton, WxcRichText, WxcCell } from 'weex-ui'
import MiniBar from '../common/MiniBar.vue'
import { getServer, createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcSpecialRichText, WxcButton, WxcRichText, MiniBar, WxcCell },
  data: () => ({
    showNew: false,
    showNewButton: true,
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
    if (['我的帖子', '最新帖子'].includes(this.menu)) {
      this.showNewButton = false
    }
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
            getServer(this, i, '最新帖子')
            break
          default:
            getServer(this, i, '帖子列表', { module: this.menu })
            break
        }
      }
    },
    wxcRichTextLinkClick (i) {
      // this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '帖子'])
      this.$store.commit('SET_forumIndex', i)
      this.$store.commit('SET_infoLevel', 1)
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
.type-container {
  margin-bottom: 0px;
  margin-top: 0px;
}
.list {
  margin-top: 91px;
}
.wrapper {
  margin-top: 91px;
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
