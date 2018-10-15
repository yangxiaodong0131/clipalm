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
const qs = require('qs')
const stream = weex.requireModule('stream')
const urlConfig = require('../../utils/config.js')
export default {
  components: { WxcCell },
  created: function () {
    this.getProvince();
  },
  methods: {
    wxcCellClicked (e) {
      // stream.fetch({
      //   method: 'GET',
      //   type: 'json',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      //   responseType: 'json',
      //   url: `${urlConfig.http}:${urlConfig.port}/library/login`,
      //   body: qs.stringify({ user: this.user })
      // }, res => {
      //   if (res.ok) {
      //     if (res.data.login) {
      //       this.info = res.data
      //       this.islogin = true
      //     } else {
      //       this.info = '- 账号或密码错误 -'
      //       this.islogin = false
      //     }
      //   } else {
      //     this.info = '- 网络连接失败 -'
      //   }
      // })
      console.log(e)
    }
  }
}
</script>
