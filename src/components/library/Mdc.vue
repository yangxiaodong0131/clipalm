<template>
  <div class="container">
      <text class="demo-title">MDC列表</text>
      <wxc-indexlist :normal-list="mdcs"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
      <wxc-popup popup-color="#FFFFFF"
                  :show="isBottomShow"
                  @wxcPopupOverlayClicked="popupOverlayBottomClick"
                  pos="right"
                  width="560">
        <wxc-button :text="button"
              size="big"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <div class="demo-content">
          <wxc-cell label="编码"
            :title="info.code"
            :has-arrow="false"
            @wxcCellClicked="wxcCellClicked"
            :has-margin="true"></wxc-cell>
          <wxc-cell label="名称"
            :title="info.desc"
            :has-arrow="false"
            @wxcCellClicked="wxcCellClicked"
            :has-margin="true"></wxc-cell>
          <wxc-cell label="年份"
            :title="info.year"
            :has-arrow="false"
            @wxcCellClicked="wxcCellClicked"
            :has-margin="true"></wxc-cell>
          <wxc-cell label="版本"
            :title="info.version"
            :has-arrow="false"
            @wxcCellClicked="wxcCellClicked"
            :has-margin="true"></wxc-cell>
          <text class="demo-title">QY小手术</text>
          <wxc-grid-select
              :single="true"
              :cols="3"
              :list="icd9_aa"></wxc-grid-select>
        </div>
      </wxc-popup>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcGridSelect, WxcButton } from 'weex-ui'
import PopBar from '../PopBar'
import { getServer } from '../../utils/server'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, PopBar, WxcGridSelect, WxcButton },
  computed: {
    mdcs: {
      get () {
        return this.$store.state.Library.mdcRule
      }
    }
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {},
      icd9_aa: [],
      button: ''
    }
  },
  updated: function () {
  },
  methods: {
    wxcCellClicked (mdc) {
      this.isBottomShow = true
      this.info = mdc
    },
    wxcButtonClicked () {
      this.$store.commit('SET_menu', 'ADRG')
      getServer(this, 'adrgOne', 'ADRG', this.info)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
      this.button = `${this.info.code}-ADRG规则`
      this.icd9_aa = e.item.icd9_aa.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
    },
    openBottomPopup () {
      this.isBottomShow = true
    },
    popupOverlayBottomClick () {
      this.isBottomShow = false
    }
  }
}
</script>
<style scoped>
</style>
