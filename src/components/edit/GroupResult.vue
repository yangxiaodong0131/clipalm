<template>
  <div class="container" v-bind:style="panel">
    <div class="demo">
      <text class="demo-title"></text>
      <wxc-cell v-for="(date, index) in result"
                v-bind:key="index"
                :label="index"
                :title="date"
                :has-arrow="false"
                :has-margin="false"></wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'
const modal = weex.requireModule('modal')
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton },
  data () {
    return {
      forceValue: 0,
      refreshing: false
    }
  },
  created () {
  },
  computed: {
    result: {
      get () {
        return this.$store.state.Edit.groupResult
      }
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  methods: {
    wxcCellClicked (e) {
      this.$store.commit('SET_visible', false)
      this.$store.commit('SET_isBottomShow', true)
      const i = this.$store.state.Home.activeTab
      const menu = '病案详情'
      this.$store.commit('SET_menu', [i, menu])
      this.$store.commit('SET_infoMenu', this.wxcCellTitle)
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails(menu, e)
      this.$store.commit('SET_miniBarTitle', `病案ID-${e.b_wt4_v1_id}病案详情`)
      this.$store.commit('SET_infoPage', details)
    },
    swipe (e) {
      if (e.direction === 'left' && this.$store.state.Home.infoPage1.info !== '') {
        this.$store.commit('SET_infoMenu', this.wxcCellTitle)
        this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '病案详情'])
        this.$store.commit('SET_infoLevel', 1)
      }
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      getServer(this, 'all', this.$store.state.Edit.editMenu)
      // modal.toast({ message: '加载下一页', duration: 1 })
    },
    longpress (wt4) {
      modal.toast({ message: '跳转论坛', duration: 1 })
      this.$store.commit('SET_showForum', true)
      this.$store.commit('SET_menus', ['论坛', '自定义查询'])
      this.$store.commit('SET_menu', [4, '论坛'])
      this.$store.commit('SET_forumMenu', `关于病案${wt4.b_wt4_v1_id}帖子`)
      this.$store.commit('SET_post', [])
      this.$store.commit('SET_forumLabel', wt4.b_wt4_v1_id)
      this.$store.commit('SET_forumPage', 1)
      getServer(this, 'all', '论坛', wt4)
    }
  }
}
</script>
<style scoped>
  .container {
    margin-top: 91px;
    width: 750px;
    background-color: #FFFFFF;
  }
  .demo-title {
    font-size: 35px;
    text-align: center;
  }
</style>
