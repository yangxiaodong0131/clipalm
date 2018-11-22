<template>
  <div class="panel">
    <div class="row">
      <image style="width:344px;height:177px" src="http://210.75.199.113/images/clipalm.png"></image>
    </div>
    <div v-bind:style="panel">
      <wxc-searchbar ref="wxc-searchbar"
        input-type='text'
        v-model = 'user.username'
        :default-value='name'
        cancel-label='用户名'
        placeholder='用户名'
        theme='yellow'
        :bar-style='barStyle'
        @wxcSearchbarInputOnInput="NameOnInput">
      </wxc-searchbar>

      <wxc-searchbar ref="wxc-searchbar"
        input-type='password'
        v-model = 'user.password'
        :default-value='pwd'
        cancel-label='密码'
        placeholder='密码'
        theme='yellow'
        :bar-style='barStyle'
        @wxcSearchbarInputOnInput="PwdOnInput">
      </wxc-searchbar>
      <div class="row">
        <wxc-button type="blue" text="登录" size="null" :btnStyle="btnStyle" @wxcButtonClicked="login"></wxc-button>
        <!-- <wxc-button text="注册" size="big" :btnStyle="btnStyle" @wxcButtonClicked="register"></wxc-button> -->
      </div>
      <wxc-button :text="loginResult" size="full" :textStyle="textStyle" :btnStyle="btnStyle2"></wxc-button>
    </div>
  </div>
</template>

<script>
import { WxcButton, WxcSearchbar, WxcCell } from 'weex-ui'
import { userLogin } from '../../utils/user'
import Category from '../common/category.vue'

export default {
  name: 'login-page',
  components: { WxcButton, WxcSearchbar, WxcCell, Category },
  data () {
    return {
      value: '输入框内容。。。',
      name: 'hitb',
      pwd: '123456',
      visible: false,
      user: { password: '123456', username: 'hitb', plat: 'client' },
      barStyle: {
        backgroundColor: '#C6e2FF'
      },
      btnStyle: {
        marginTop: '20px'
      },
      btnStyle2: {
        paddingLeft: '15px',
        backgroundColor: 'rgba(224, 221, 220, 0)',
        borderWidth: '0px'
      },
      textStyle: {
        color: 'rgb(166, 162, 162)'
      },
      cellStyle: {
        backgroundColor: '#C6e2FF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: '#FFFFFF'
      }
    }
  },
  computed: {
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    loginResult () {
      return this.$store.state.Home.user.loginResult
    }
  },
  methods: {
    login () {
      userLogin(this, this.user)
    },
    register () {
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, '注册用户'])
    },
    NameOnInput (e) {
      this.user.username = e.value
    },
    PwdOnInput (e) {
      this.user.password = e.value
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .panel {
    flex-direction: column;
    justify-content: center;
    /* height: 750; */
    margin-left: 0px;
    /* border-width: 2px; */
    /* border-style: solid; */
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
    margin-top: 201px;
  }
  .text {
    color: #666666;
    font-size: 32px;
    margin-left: 30px;
    margin-bottom: 15px;
  }
  .row {
    width: 750px;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10px;
  }
</style>
