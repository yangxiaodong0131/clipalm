<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
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
      <wxc-button text="用户登陆" @wxcButtonClicked="login"></wxc-button>
      <text class="info">{{info}}</text>
      <text class="value-text">{{value}}</text>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import { WxcButton, WxcSearchbar } from 'weex-ui'
const qs = require('qs')
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')

export default {
  name: 'home-page',
  components: { NavBar, WxcButton, WxcSearchbar },
  data () {
    return {
      info: '网络连接中...',
      value: '输入框内容。。。',
      islogin: false,
      user: { password: '123456', username: 'hitb' }
    }
  },
  methods: {
    login () {
      stream.fetch({
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: 'http://www.jiankanglaifu.com/servers/login',
        body: qs.stringify({ user: this.user })
      }, res => {
        if (res.ok) {
          if (res.data.login) {
            this.info = res.data
            this.islogin = true
          } else {
            this.info = '- 账号或密码错误 -'
            this.islogin = false
          }
        } else {
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
    /* flex-direction: column; */
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
