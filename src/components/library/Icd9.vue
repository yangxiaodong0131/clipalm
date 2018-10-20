<template>
  <scroller class="scroller">
      <text class="demo-title">ICD9列表</text>
      <wxc-indexlist :normal-list="icd9s"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"
                    :only-show-list="true"></wxc-indexlist>
      <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
        <text class="indicator-text">Loading ...</text>
        <loading-indicator class="indicator"></loading-indicator>
      </loading>
      <wxc-popup popup-color="#FFFFFF"
                  :show="isBottomShow"
                  @wxcPopupOverlayClicked="popupOverlayBottomClick"
                  pos="right"
                  width="560">
        <!-- <wxc-button :text="button"
              size="big"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button> -->
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
          <wxc-cell label="手术室手术"
            :title="info.p_type"
            :has-arrow="false"
            @wxcCellClicked="wxcCellClicked"
            :has-margin="true"></wxc-cell>
          <text class="demo-title">ADRG</text>
          <wxc-grid-select
            :single="true"
            :cols="3"
            :list="adrg"></wxc-grid-select>
        </div>
      </wxc-popup>
  </scroller>
</template>

<script>
import { WxcIndexlist, WxcCell, WxcButton, WxcGridSelect, WxcPopup } from 'weex-ui'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcCell, WxcIndexlist, WxcButton, WxcGridSelect, WxcPopup },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {},
      adrg: [],
      button: '',
      loadinging: false,
      lists: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    icd9s: {
      get () {
        return this.$store.state.Library.icd9Rule
      }
    }
  },
  methods: {
    onloading (event) {
      modal.toast({ message: 'Loading', duration: 1 })
      this.loadinging = true
      getServer(this, 'icd9One', 'icd9One')
      setTimeout(() => {
        this.loadinging = false
      }, 2000)
    },
    wxcCellClicked (icd9) {
      this.isBottomShow = true
      this.info = icd9
    },
    wxcButtonClicked () {
      this.$store.commit('SET_menu', 'DRG')
      getServer(this, 'drgOne', 'DRG', this.info)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
      this.adrg = e.item.adrg.map((x) => {
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
