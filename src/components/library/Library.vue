<template>
  <div class="container">
      <wxc-loading :show="isShow" type="trip"></wxc-loading>
      <wxc-part-loading :show="isShow"></wxc-part-loading>
      <wxc-indexlist :normal-list="rule"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcLoading, WxcPartLoading } from 'weex-ui'
import { getDetails } from '../../utils/details'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, WxcLoading, WxcPartLoading },
  data () {
    return {
      // isBottomShow: false,
      height: 400,
      // info: {},
      isShow: false
    }
  },
  computed: {
    rule: {
      get () {
        let data = []
        switch (this.$store.state.Library.libraryMenu) {
          case 'MDC':
            data = this.$store.state.Library.mdcRule
            break
          case 'ADRG':
            data = this.$store.state.Library.adrgRule
            break
          case 'DRG':
            data = this.$store.state.Library.drgRule
            break
          case 'ICD10':
            data = this.$store.state.Library.icd10Rule
            break
          case 'ICD9':
            data = this.$store.state.Library.icd9Rule
            break
          default:
            data = []
            break
        }
        return data
      }
    }
  },
  updated: function () {
  },
  methods: {
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      // let button = ''
      // let isInfoButtonShow = false
      // let gridList = []
      // let details = []
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '规则详情'])
      const details = getDetails(`${this.$store.state.Library.libraryMenu}规则详情`, e.item)
      this.$store.commit('SET_infoPage', details)
      // switch (this.$store.state.Library.libraryMenu) {
      //   case 'MDC':
      //     button = `${e.item.code}-ADRG规则`
      //     isInfoButtonShow = true
      //     gridList = e.item.icd9_aa.map((x) => {
      //       const obj = {}
      //       obj.title = x
      //       return obj
      //     })
      //     details = [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}]
      //     break
      //   case 'ADRG':
      //     button = `${e.item.code}-DRG规则`
      //     isInfoButtonShow = true
      //     gridList = e.item.icd10_aa.map((x) => {
      //       const obj = {}
      //       obj.title = x
      //       return obj
      //     })
      //     details = [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}]
      //     break
      //   case 'DRG':
      //     button = ``
      //     gridList = []
      //     details = [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}]
      //     break
      //   case 'ICD10':
      //     button = ``
      //     gridList = e.item.adrg.map((x) => {
      //       const obj = {}
      //       obj.title = x
      //       return obj
      //     })
      //     details = [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}]
      //     break
      //   case 'ICD9':
      //     button = ``
      //     gridList = e.item.adrg.map((x) => {
      //       const obj = {}
      //       obj.title = x
      //       return obj
      //     })
      //     details = [{'label': '编码', 'title': 'code'}, {'label': '名称', 'title': 'desc'}, {'label': '年份', 'title': 'year'}, {'label': '版本', 'title': 'version'}]
      //     break
      //   default :
      //     break
      // }
      // this.$store.commit('SET_isInfoButtonShow', isInfoButtonShow)
      // this.$store.commit('SET_buttonText', button)
      // this.$store.commit('SET_gridList', gridList)
      // this.$store.commit('SET_details', details)
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
<style scoped>
</style>
