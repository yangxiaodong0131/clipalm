<template>
  <div class="container">
    <text class="demo-title">ADRG列表</text>
    <wxc-indexlist :normal-list="adrgs"
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
        <text class="demo-title">主要诊断</text>
        <wxc-grid-select
          :single="true"
          :cols="3"
          :list="icd10_aa"></wxc-grid-select>
        <text class="demo-title">主要手术</text>
        <wxc-grid-select
          :single="true"
          :cols="3"
          :list="icd9_aa"></wxc-grid-select>
        <text class="demo-title">其他诊断</text>
        <wxc-grid-select
          :single="true"
          :cols="3"
          :list="icd10_bb"></wxc-grid-select>
        <text class="demo-title">其他手术</text>
        <wxc-grid-select
          :single="true"
          :cols="3"
          :list="icd9_bb"></wxc-grid-select>
      </div>
    </wxc-popup>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcCell, WxcButton, WxcGridSelect, WxcPopup } from 'weex-ui'
import { getServer } from '../../utils/server'
import PopBar from '../PopBar'
export default {
  components: { WxcCell, PopBar, WxcIndexlist, WxcGridSelect, WxcButton, WxcPopup },
  computed: {
    adrgs: {
      get () {
        return this.$store.state.Library.adrgRule
      }
    }
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {},
      button: '',
      icd9_aa: [],
      icd9_bb: [],
      icd10_aa: [],
      icd10_bb: []
    }
  },
  methods: {
    wxcCellClicked (adrg) {
      this.isBottomShow = true
      this.info = adrg
    },
    wxcButtonClicked () {
      this.$store.commit('SET_menu', 'DRG')
      getServer(this, 'drgOne', 'DRG', this.info)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
      this.button = `${this.info.code}-DRG规则`
      this.icd9_aa = e.item.icd9_aa.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.icd10_aa = e.item.icd10_aa.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.icd9_bb = e.item.icd9_bb.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.icd10_bb = e.item.icd10_bb.map((x) => {
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
