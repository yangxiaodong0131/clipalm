<template>
  <div class="panel">
    <!-- default-value='hitb' -->
    <!-- cancel-label='用户名' -->
    <!-- placeholder='用户名' -->
    <wxc-searchbar ref="wxc-searchbar"
      input-type='text'
      v-model = 'user.username'
      default-value='hitb'
      placeholder='用户名'
      @wxcSearchbarCancelClicked="NameOnCancel"
      @wxcSearchbarInputReturned="NameOnReturn"
      @wxcSearchbarInputOnInput="NameOnInput"
      @wxcSearchbarCloseClicked="NameOnClose"
      @wxcSearchbarInputOnFocus="NameOnFocus"
      @wxcSearchbarInputOnBlur="NameOnBlur">
    </wxc-searchbar>
    <!-- default-value='123456'  -->
    <wxc-searchbar ref="wxc-searchbar"
      input-type='password'
      v-model = 'user.password'
      default-value='123456'
      cancel-label='密码'
      @wxcSearchbarCancelClicked="PwdOnCancel"
      @wxcSearchbarInputReturned="PwdOnReturn"
      @wxcSearchbarInputOnInput="PwdOnInput"
      @wxcSearchbarCloseClicked="PwdOnClose"
      @wxcSearchbarInputOnFocus="PwdOnFocus"
      @wxcSearchbarInputOnBlur="PwdOnBlur">
    </wxc-searchbar>
    <wxc-button type="blue" text="登陆" size="small" @wxcButtonClicked="login"></wxc-button>
    <wxc-button text="注册" size="small" @wxcButtonClicked="login"></wxc-button>
    <text class="info">{{info}}</text>
    <text class="value-text">{{value}}</text>
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcButton, WxcSearchbar } from 'weex-ui'
import PopBar from '../PopBar'
const qs = require('qs')
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')
const urlConfig = require('../../utils/config.js')

export default {
  name: 'login-page',
  components: { WxcButton, WxcSearchbar, PopBar },
  data () {
    return {
      info: '...',
      value: '输入框内容。。。',
      user: { password: '123456', username: 'hitb', plat: 'client' }
    }
  },
  methods: {
    login () {
      stream.fetch({
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/login`,
        body: qs.stringify({ params: this.user })
      }, res => {
        if (res.ok) {
          if (res.data.login) {
            this.$store.commit('SET_user', res.data)
            this.$router.push('/')
            this.$store.commit('SET_visible', 0)
            this.$store.commit('SET_menu', [0, '个人信息'])
          } else {
            this.info = '- 账号或密码错误 -'
            this.$store.commit('SET_user', { login: false })
          }
        } else {
          this.$store.commit('SET_user', { login: false })
          this.info = '- 网络连接失败 -'
        }
      })
    },
    NameOnFocus () {
      this.value = '用户名输入中。。。'
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    NameOnBlur () {
      modal.toast({ 'message': 'onbulr', 'duration': 1 })
    },
    NameOnClose () {
      modal.toast({ 'message': 'close.click', 'duration': 1 })
    },
    NameOnInput (e) {
      this.value = e.value
    },
    NameOnCancel () {
      modal.toast({ 'message': 'cancel.click', 'duration': 1 })
    },
    NameOnReturn () {
      modal.toast({ 'message': 'return.click', 'duration': 1 })
    },

    PwdOnFocus () {
      this.value = '密码输入中。。。'
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    PwdOnBlur () {
      modal.toast({ 'message': 'onbulr', 'duration': 1 })
    },
    PwdOnClose () {
      modal.toast({ 'message': 'close.click', 'duration': 1 })
    },
    PwdOnInput (e) {
      this.value = e.value
    },
    PwdOnCancel () {
      modal.toast({ 'message': 'cancel.click', 'duration': 1 })
    },
    PwdOnReturn () {
      modal.toast({ 'message': 'return.click', 'duration': 1 })
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
