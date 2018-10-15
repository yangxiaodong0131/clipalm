<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">MDC列表</text>
      <wxc-cell v-for="mdc in mdcs"
                :label="mdc.code"
                :title="mdc.name"
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
    mdcs: {
      get() {
        return this.$store.state.Library.rule
      }
    },
  },
  updated: function () {
  },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    }
  }
}
</script>
