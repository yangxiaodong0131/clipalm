<template>
  <div class="container" v-if="infoLevel === 1">
    <list class="list">
      <category class="category" :title="forum.title"></category>
      <cell v-for="(data, index) in content" v-bind:key="index">
        <div class="panel">
          <wxc-cell
            :label="`${index + 1}#`"
            :title="`${data.content}`"
            :desc="`${data.username}  ${data.datetime}`"
            :extraContent="`${data.reply.length}`"
            :has-margin="false"
            :has-vertical-indent="false"
            :has-arrow="true"
            :arrow-icon="arrawSrc"
            @wxcCellClicked="wxcCellClicked(data, index)">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <div>
      <text v-if="textShow" style="font-size:35px;">{{text}}</text>
      <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" value="" ></textarea>
      <wxc-button text="回复"
        class="submits"
        size="full"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>
    <mini-bar :title="title"></mini-bar>
  </div>
  <div class="container" v-else>
    <list class="list">
      <category class="category" :title="forum.title"></category>
      <text class="text">{{replyIndex + 1}}#的回复</text>
      <cell>
        <div class="panel" v-for="(reply, index) in reply" v-bind:key="index">
          <wxc-cell
            :title="`${reply.content}`"
            :desc="`${reply.username}  ${reply.datetime}`"
            :has-margin="false"
            :has-vertical-indent="false"
            :has-arrow="false"
            :arrow-icon="arrawSrc">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <div>
      <text v-if="textShow" style="font-size:35px;">{{text}}</text>
      <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" value="" ></textarea>
      <wxc-button text=" 再回复"
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
import Category from '../common/category.vue'
import { createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcPopup, WxcCell, WxcButton, MiniBar, WxcRichText, WxcSpecialRichText, Category },
  data () {
    return {
      textContent: '1234',
      textShow: false,
      seen: true,
      text: '',
      data: null,
      reply: [],
      replyId: null,
      replyIndex: null,
      arrawSrc: 'http://210.75.199.113/images/massage.png'
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
    infoLevel () {
      return this.$store.state.Home.infoLevel[this.activeTab]
    },
    posts () {
      return this.$store.state.Forum.post
    },
    forum () {
      return this.$store.state.Forum.forumContent
    },
    title () {
      return `${this.forum.module}`
    },
    content () {
      return this.$store.state.Forum.forumContent.content
    },
    forumIndex () {
      return this.$store.state.Forum.forumIndex
    }
  },
  methods: {
    oninput2 (event) {
      this.textContent = event.value
    },
    change () {
      this.seen = false
    },
    wxcButtonClicked () {
      let ForumContent = {}
      if (this.$store.state.Home.user.login && this.infoLevel === 1) {
        ForumContent = { forum_id: this.forum.id, content: this.textContent, username: this.username }
        createForum(this, { forum_all: { forum_content: ForumContent } }, 'reply', this.activeTab)
      } else if (this.$store.state.Home.user.login && this.infoLevel === 2) {
        ForumContent = { sid: this.forum.id, forum_content_id: this.replyId, content: this.textContent, username: this.username }
        createForum(this, { forum_all: { forum_content: ForumContent } }, 'reply', this.activeTab)
        this.$store.commit('SET_infoLevel', this.infoLevel - 1)
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    },
    wxcRichNextLinkClick () {
    },
    wxcCellClicked (data, index) {
      this.$store.commit('SET_infoLevel', this.infoLevel + 1)
      this.reply = data.reply
      this.replyId = data.id
      this.replyIndex = index
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
