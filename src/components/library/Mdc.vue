<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">MDC列表</text>
      <wxc-cell label="MDCA"
                title="Weex Ui"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
      <wxc-cell label="MDCB"
                title="Weex Ui"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
export default {
  components: { WxcCell },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    }
  }
}
</script>
