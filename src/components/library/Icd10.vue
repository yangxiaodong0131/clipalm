<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ICD10列表</text>
      <wxc-cell label="A01"
                title="Weex Ui"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
      <wxc-cell label="A02"
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
