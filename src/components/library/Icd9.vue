<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">ICD9列表</text>
      <wxc-cell label="01.1"
                title="Weex Ui"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
      <wxc-cell label="01.2"
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
