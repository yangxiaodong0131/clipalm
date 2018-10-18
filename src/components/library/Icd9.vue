<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ICD9列表</text>
      <wxc-cell v-for="(icd9, i) in icd9s"
                v-bind:key="i"
                :label="icd9.code"
                :title="icd9.desc"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
    </div>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
import PopBar from '../PopBar'
export default {
  components: { WxcCell, PopBar },
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
    }
  }
}
</script>
