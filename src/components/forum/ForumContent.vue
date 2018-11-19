<template>
  <div class="container" v-if="seen">
    <list class="list">
      <cell class="cell" v-for="(data, index) in datas" v-bind:key="index">
        <div class="type-container">
          <wxc-rich-text class="special-rich"
            :config-list="configList1[index]"
            @wxcRichTextLinkClick="wxcRichNextLinkClick"></wxc-rich-text>
          <text class="type-text" @click="change" style="color:#a4a3a5;font-size:20px">{{data.username}} | {{data.datetime}}</text>
          <div v-if="data.reply !== []" v-for="(reply, index) in data.reply" v-bind:key="`reply-${index}`">
            <div class="row">
              <div class="col-md-6"><text class="type-text" style="color:#a4a3a5;font-size:25px">     {{reply.username}}</text></div>
              <div class="col-md-6"><text class="type-text" style="color:#000000;font-size:25px">    回复@{{data.username}}:{{reply.content}}</text></div>
            </div>
          </div>
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
    <mini-bar :title="title"></mini-bar>
  </div>
  <div class="container" v-else>
    <div class="wrapper">
      <div class="type-container"  v-for="(data, index) in datas" v-bind:key="index">
        <!--<wxc-rich-text class="special-rich"
                        :config-list="configList2[index]"
                        @wxcRichTextLinkClick="wxcRichNextLinkClick"></wxc-rich-text>-->
        <text class="type-text" @click="change" v-if="data.reply !== []"  v-for="(reply, index) in data.reply" v-bind:key="`reply-${index}`" style="color:#a4a3a5;font-size:20px">{{`${index + 1}楼`}} | {{reply.content}}</text>
        <text class="type-text" @click="change" v-if="data.reply !== []"  v-for="(reply, index) in data.reply" v-bind:key="`reply-${index}`" style="color:#a4a3a5;font-size:20px">{{reply.username}} | {{reply.datetime}}</text>
      </div>
    </div>
    <div>
      <text v-if="textShow" style="font-size:35px;">{{text}}</text>
      <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" :autofocus=true value="" ></textarea>
      <wxc-button text="回复"
        class="submits"
        size="full"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>
    <mini-bar :title="title"></mini-bar>
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
      content: '',
      textShow: false,
      seen: true,
      text: '',
      data: null,
      cellStyle: {
        backgroundColor: '#C6e2FF',
        height: '50px',
        width: '600px',
        fontSize: '30px'
      }
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
    forum () {
      return this.$store.state.Forum.forumContent
    },
    title () {
      return `${this.forum.module}-${this.forum.title}`
    },
    datas () {
      return this.$store.state.Forum.forumContent.content
    },
    configList1 () {
      const configs = []
      if (this.datas) {
        this.datas.map((x, index) => {
          const config = [{
            type: 'text',
            value: `${index + 1}楼`,
            theme: 'yellow',
            fontSize: 30
          }, {
            type: 'text',
            value: `${x.content}`,
            style: {
              fontSize: 30,
              color: '#000000'
            }
          }]
          configs.push(config)
        })
      }
      return configs
    },
    // coverage () {
    //   const coverages = []
    //   if (this.datas) {
    //     this.datas.map((x, index) => {
    //       const coverage = x
    //       coverages.push(coverage)
    //     })
    //   }
    //   return coverages
    // // },
    // configList2 () {
    //   const configs = []
    //   if (this.datas) {
    //     this.datas.map((x, index) => {
    //       console.log(x)
    //       this.x.map((e, order) => {
    //         console.log(e)
    //       })
    //       const config = [{
    //         type: 'text',
    //         value: `${index + 1}楼`,
    //         theme: 'yellow',
    //         fontSize: 30
    //       }, {
    //         type: 'text',
    //         value: `${x.reply[index].content}`,
    //         style: {
    //           fontSize: 30,
    //           color: '#000000'
    //         }
    //       }]
    //       configs.push(config)
    //     })
    //   }
    //   return configs
    // },
    // a () {
    //   console.log(this.datas)
    //   return ''
    // },
    forumIndex () {
      return this.$store.state.Forum.forumIndex
    }
  },
  methods: {
    oninput2 (event) {
      this.content = event.value
    },
    change () {
      this.seen = false
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
    wxcRichNextLinkClick () {
    },
    wxcRichTextLinkClick (data) {
      const index = 1
      modal.toast({ message: index, duration: 1 })
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
</style>
