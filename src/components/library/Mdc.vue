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
        return this.$store.state.Library.rule
      }
    }
  },
  updated: function () {
  },
  methods: {
    wxcIndexlistItemClicked (e) {
      // this.isBottomShow = true
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      // this.info = e.item
      const button = `${e.item.code}-ADRG规则`
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
<style scoped>
</style>
