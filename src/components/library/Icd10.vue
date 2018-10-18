<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ICD10列表</text>
      <wxc-indexlist :normal-list="icd10s"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
    </div>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
export default {
  components: { WxcCell, PopBar, WxcIndexlist },
  computed: {
    icd10s: {
      get () {
        return this.$store.state.Library.icd10Rule
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
