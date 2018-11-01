<template>
  <div class="demo">
      <div class="demo-content">
        <wxc-cell v-for="(data, index) in datas"
          :key="index"
          :label="data.username"
          :title="data.content"
          :extraContent="data.datetime"
          :has-arrow="false"
          ></wxc-cell>
        <div class="wrapper">
          <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2"></textarea>
        </div>
        <wxc-button text="回复"
              size="full"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      </div>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcGridSelect } from 'weex-ui'
import { createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcPopup, WxcCell, WxcButton, WxcGridSelect },
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
        createForum(this, { forum_content: ForumContent })
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    }
  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
    background-color: #f2f3f4;
    margin-top: 91px;
  }
</style>
