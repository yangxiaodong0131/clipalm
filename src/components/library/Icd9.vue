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
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      const adrg = e.item.adrg.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.$store.commit('SET_gridList', adrg)
      this.$store.commit('SET_details', [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}, {'label': '手术室手术', 'title': 'p_type'}])
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
