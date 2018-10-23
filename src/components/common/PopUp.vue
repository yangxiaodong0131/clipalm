<template>
<wxc-popup popup-color="#FFFFFF"
            :show="isBottomShow"
            @wxcPopupOverlayClicked="popupOverlayBottomClick"
            pos="right"
            width="560">
  <wxc-button :text="button"
        v-show="isInfoButtonShow"
        size="big"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  <div class="demo-content">
    <wxc-cell v-for="(detail, index) in details"
      :key="index"
      :label="detail.label"
      :title="info[detail.title]"
      :has-arrow="false"
      @wxcCellClicked="wxcCellClicked"
      :has-margin="true"></wxc-cell>
    <wxc-grid-select
        :single="true"
        :cols="3"
        :list="gridList"></wxc-grid-select>
    </div>
  </wxc-popup>
</template>

<script>
import { WxcPopup, WxcCell, WxcButton, WxcGridSelect } from 'weex-ui'
import { getServer } from '../../utils/server'

export default {
  components: { WxcPopup, WxcCell, WxcButton, WxcGridSelect },
  data () {
    return {
      // isBottomShow: false
    }
  },
  computed: {
    details () {
      return this.$store.state.Home.details
    },
    gridList () {
      return this.$store.state.Home.gridList
    },
    button () {
      return this.$store.state.Home.buttonText
    },
    isBottomShow () {
      return this.$store.state.Home.isBottomShow
    },
    isInfoButtonShow () {
      return this.$store.state.Home.isInfoButtonShow
    },
    info () {
      return this.$store.state.Home.info
    }
  },
  methods: {
    wxcRichTextLinkClick () {
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_isBottomShow', false)
    },
    wxcCellClicked (mdc) {
      this.isBottomShow = true
      this.$store.commit('SET_isBottomShow', true)
      this.info = mdc
    },
    wxcButtonClicked () {
      let menu = ''
      let type = ''
      switch (this.$store.state.Home.activeTab) {
        case 2:
          switch (this.$store.state.Library.libraryMenu) {
            case 'MDC':
              menu = 'ADRG'
              type = 'adrgOne'
              break
            case 'ADRG':
              menu = 'DRG'
              type = 'drgOne'
              break
          }
          break
        default :
          break
      }
      this.$store.commit('SET_isBottomShow', false)
      this.$store.commit('SET_menu', menu)
      getServer(this, type, menu, this.info)
    }
  }
}
</script>
