<template>
  <!-- <div class="demo">
      <cell class="cell" v-for="(data, index) in datas" v-bind:key="index">
        <text>132456789123456789</text>
        <wxc-cell
          :label="data.username"
          :title="data.content"
          :extraContent="data.datetime"
          :has-arrow="false"
          ></wxc-cell>
      </cell>
      <div class="wrapper">
        <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2"></textarea>
      </div>
      <wxc-button text="回复"
        class="submits"
        size="full"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </div> -->
  <div>
    <div class="box"></div>
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
      modal.toast({ message: '请先登录', duration: 1 })
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
    margin-top: 192px;
  }
  .submits{
    position: relative;
    margin-top: 20px;
    left: 23px;
    top: 1px;
  }
  .cell{
    margin-top: 91px;
  }
  .wrapper{
    margin-top: 20px;
  }
  .box {
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    width: 250px;
    height: 250px;
    margin-top: 250px;
    margin-left: 250px;
    background-color: #EEE;
  }
</style>
