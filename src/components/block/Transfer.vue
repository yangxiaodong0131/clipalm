<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">转账</text>
      <wxc-cell label="用户名"
                title="Weex Ui"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>
      <wxc-cell label="邮箱"
                title="Weex Ui"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell>
    </div>
    <div class="demo">
      <text class="demo-title">用户权限</text>
      <wxc-cell title="专家组成员"
                :has-arrow="false"
                :has-top-border="true">
        <switch slot="value"></switch>
      </wxc-cell>
      <wxc-cell title="MDC组"
                desc="A、B、C"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true">
      </wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
export default {
  name: 'user-doc',
  components: { WxcCell },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .panel {
    margin-left: 0px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
</style>
