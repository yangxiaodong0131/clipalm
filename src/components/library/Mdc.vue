<template>
  <div class="container">
      <wxc-loading :show="isShow" type="trip"></wxc-loading>
      <wxc-part-loading :show="isShow"></wxc-part-loading>
      <text class="demo-title">MDC列表</text>
      <wxc-indexlist :normal-list="mdcs"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
    <pop-up></pop-up>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcLoading, WxcPartLoading } from 'weex-ui'
import PopBar from '../PopBar'
import PopUp from '../PopUp'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, PopBar, WxcLoading, WxcPartLoading, PopUp },
  data () {
    return {
      // isBottomShow: false,
      height: 400,
      // info: {},
      isShow: false
    }
  },
  computed: {
    mdcs: {
      get () {
        return this.$store.state.Library.mdcRule
      }
    },
    info: {
      get () {
        return this.$store.state.Home.info
      }
    }
  },
  updated: function () {
  },
  methods: {
    wxcCellClicked (mdc) {
      this.isBottomShow = true
      this.$store.commit('SET_info', mdc)
      // this.info = mdc
    },
    wxcIndexlistItemClicked (e) {
      // this.isBottomShow = true
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      // this.info = e.item
      const button = `${this.info.code}-ADRG规则`
      this.$store.commit('SET_buttonText', button)
      const icd9aa = e.item.icd9_aa.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.$store.commit('SET_gridList', icd9aa)
      this.$store.commit('SET_details', [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}])
    },
    openBottomPopup () {
      // this.isBottomShow = true
      this.$store.commit('SET_isBottomShow', true)
    },
    popupOverlayBottomClick () {
      // this.isBottomShow = false
      this.$store.commit('SET_isBottomShow', false)
    }
  }
}
</script>
<style>
</style>
