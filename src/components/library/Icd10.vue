<template>
  <scroller class="scroller">
    <text class="demo-title">ICD10列表</text>
    <wxc-indexlist :normal-list="icd10s"
                  @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                  :show-index="true"></wxc-indexlist>
    <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
      <text class="indicator-text">Loading ...</text>
      <loading-indicator class="indicator"></loading-indicator>
    </loading>
  </scroller>
</template>

<script>
import { WxcIndexlist, WxcCell, WxcPopup, WxcGridSelect, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, WxcGridSelect, WxcButton },
  data () {
    return {
      loadinging: false,
      lists: [1, 2, 3, 4, 5],
      isBottomShow: false,
      height: 400,
      info: {},
      adrg: [],
      button: ''
    }
  },
  computed: {
    icd10s: {
      get () {
        return this.$store.state.Library.icd10Rule
      }
    }
  },
  methods: {
    onloading (event) {
      modal.toast({ message: 'Loading', duration: 1 })
      this.loadinging = true
      getServer(this, 'icd10One', 'icd10One')
      setTimeout(() => {
        this.loadinging = false
      }, 2000)
    },
    wxcCellClicked (icd10) {
      this.isBottomShow = true
      this.info = icd10
    },
    wxcButtonClicked () {
      this.$store.commit('SET_menu', 'ADRG')
      getServer(this, 'adrgOne', 'ADRG', this.info)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
      this.adrg = e.item.adrg.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      const adrg = e.item.adrg.map((x) => {
        const obj = {}
        obj.title = x
        return obj
      })
      this.$store.commit('SET_gridList', adrg)
      this.$store.commit('SET_details', [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}, {'label': 'MCC', 'title': 'mcc'}, {'label': 'CC', 'title': 'cc'}])
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
  .loading {
    width: 750;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }
  .panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
