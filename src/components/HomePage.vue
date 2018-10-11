<template>
  <div class="wrapper">
    <nav-bar></nav-bar>
    <div class="panel">
      <wxc-searchbar ref="wxc-searchbar"
        input-type='text' autofocus=true
        default-value='hitb' cancel-label='用户名'
        @wxcSearchbarCancelClicked="NameOnCancel"
        @wxcSearchbarInputReturned="NameOnReturn"
        @wxcSearchbarInputOnInput="NameOnInput"
        @wxcSearchbarCloseClicked="NameOnClose"
        @wxcSearchbarInputOnFocus="NameOnFocus"
        @wxcSearchbarInputOnBlur="NameOnBlur">
      </wxc-searchbar>
      <wxc-searchbar ref="wxc-searchbar"
        input-type='password'
        default-value='123456' cancel-label='密码'
        @wxcSearchbarCancelClicked="PwdOnCancel"
        @wxcSearchbarInputReturned="PwdOnReturn"
        @wxcSearchbarInputOnInput="PwdOnInput"
        @wxcSearchbarCloseClicked="PwdOnClose"
        @wxcSearchbarInputOnFocus="PwdOnFocus"
        @wxcSearchbarInputOnBlur="PwdOnBlur">
      </wxc-searchbar>
      <wxc-button text="用户登陆" @wxcButtonClicked="login"></wxc-button>
      <text class="count">{{count}}</text>
      <text class="value-text">{{value}}</text>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import { WxcButton, WxcSearchbar } from 'weex-ui'
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')

export default {
  name: 'home-page',
  components: { NavBar, WxcButton, WxcSearchbar },
  data () {
    return {
      count: '网络连接中...',
      value: '输入框内容。。。'
    }
  },
  methods: {
    login () {
      stream.fetch({
        method: 'GET',
        type: 'json',
        url: 'https://api.github.com/repos/vuejs/vue'
      }, res => {
        if (res.ok) {
          this.count = res.data.stargazers_count
          this.count = '登陆成功'
        } else {
          this.count = '- unknown -'
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
