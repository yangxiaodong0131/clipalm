<template>
  <div class="container">
    <list class="list">
      <cell class="cell" v-for="(data, index) in datas" v-bind:key="index">
        <wxc-cell
          :label="data.username"
          :title="data.content"
          :extraContent="data.datetime"
          :has-margin="false">
        </wxc-cell>
      </cell>
    </list>
    <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2"></textarea>
    <wxc-button text="回复"
      class="submits"
      size="full"
      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton } from 'weex-ui'
import { createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcPopup, WxcCell, WxcButton },
  data () {
    return {
      content: '123'
    }
  },
  computed: {
    datas () {
      return this.$store.state.Forum.forumContent.content
    }
  },
  methods: {
    oninput2 (event) {
      this.content = event.value
    },
    wxcButtonClicked () {
      if (this.$store.state.Home.user.login) {
        const ForumContent = { forum_id: this.$store.state.Forum.forumContent.id, content: this.content, username: this.$store.state.Home.user.data.username }
        createForum(this, { forum_all: { forum_content: ForumContent }}, 'reply')
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
  margin-top: 91px;
}
</style>
