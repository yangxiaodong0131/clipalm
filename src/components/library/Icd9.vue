
<template>
  <div class="container">
    <text class="demo-title">ICD9列表</text>
    <wxc-indexlist :normal-list="icd9s"
                  @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                  :show-index="false"
                  :only-show-list="true"></wxc-indexlist>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
export default {
  components: { WxcCell, PopBar, WxcIndexlist },
  computed: {
    icd9s: {
      get () {
        return this.$store.state.Library.icd9Rule
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    },
    wxcIndexlistItemClicked (e) {
      this.isBottomShow = true
      this.info = e.item
    }
  }
}
</script>
