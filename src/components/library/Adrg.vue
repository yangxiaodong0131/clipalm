<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ADRG列表</text>
      <wxc-cell v-for="(adrg, i) in adrgs"
                v-bind:key="i"
                :label="adrg.code"
                :title="adrg.name"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
export default {
  components: { WxcCell },
  computed: {
    adrgs: {
      get () {
        return this.$store.state.Library.adrgRule
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
