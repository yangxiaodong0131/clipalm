<template>
  <div class="panel" v-bind:style="panel">
    <category class="category" title="--选择用户功能--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_1"
      @select="params => onSelect(params, 'user')">
    </wxc-grid-select>
    <category title="--选择字典版本--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_2"
      @select="params => onSelect(params, 'version')">
    </wxc-grid-select>
    <category title="--选择MDC修订--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="mdcs"
      @select="params => onSelect(params, 'mdc')">
    </wxc-grid-select>
    <div style="height:20px;"></div>
    <wxc-button text="退出登录"
        size="full"
        class="submits"
        type="blue"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    <mini-bar title="用户信息" rightIcon="table"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { userLogout, updateUser } from '../../utils/user'
const modal = weex.requireModule('modal')

export default {
  name: 'user-doc',
  components: { WxcMinibar, WxcGridSelect, Category, WxcButton, WxcCell, MiniBar },
  data: () => ({
    customStyles: {
      lineSpacing: '14px',
      width: '150px',
      height: '60px',
      icon: '',
      color: '#333333',
      checkedColor: '#ffffff',
      disabledColor: '#eeeeee',
      borderColor: '#666666',
      checkedBorderColor: '#ffb200',
      backgroundColor: '#ffffff',
      checkedBackgroundColor: '#1E90FF'
    }
  }),
  computed: {
    user: {
      get () {
        return this.$store.state.Home.user.data
      }
    },
    list_1: {
      get () {
        const types = {
          专家用户: { title: '专家用户', value: 1 },
          // 机构用户: { title: '机构用户', value: 2, disabled: 'true' },
          个人用户: { title: '个人用户', value: 2 }
        }
        let serverType = ''
        if (this.$store.state.Home.user.data.type) {
          serverType = this.$store.state.Home.user.data.type
        } else {
          serverType = '个人用户'
        }
        if (types[serverType]) {
          types[serverType].checked = true
        }
        return Object.values(types)
      }
    },
    list_2: {
      get () {
        const versions = {
          BJ编码版: { title: 'BJ编码版', value: 1 },
          GB编码版: { title: 'GB编码版', value: 1 },
          // CC编码版: { title: 'CC编码版', value: 1, disabled: 'true' },
          术语版: { title: '术语版', value: 3 }
        }
        let serverVersion = ''
        if (this.$store.state.Home.user.data.clipalm_version) {
          serverVersion = this.$store.state.Home.user.data.clipalm_version
        } else {
          serverVersion = 'BJ编码版'
        }
        if (versions[serverVersion]) {
          versions[serverVersion].checked = true
        }
        return Object.values(versions)
      }
    },
    mdcs: {
      get () {
        const arr = this.$store.state.Home.user.data.mdc
        if (arr) {
          return arr.map((value, index) => { return {'title': 'MDC' + value} })
        }
        return []
      }
    },
    panel: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          width: '750px',
          height: tabPageHeight
        }
        return style
      }
    }
  },
  methods: {
    minibarRightButtonClick (e) {
      this.$store.commit('SET_menu', [0, '用户登录'])
    },
    onSelect (params, type) {
      const user = {}
      switch (type) {
        case 'mdc':
          const mdc = this.mdcs[params.selectIndex].title
          this.$store.commit('SET_mdc', mdc)
          user.clipalm_mdc = mdc
          break
        case 'version':
          const version = this.list_2[params.selectIndex].title
          this.$store.commit('SET_menu', [2, '字典'])
          this.$store.commit('SET_infoLevel', [2, 0])
          console.log(this.$store.state.Home.activeTab)
          user.clipalm_version = version
          modal.toast({ message: `已设置${version}为默认查询版本`, duration: 1 })
          break
        case 'user':
          const types = this.list_1[params.selectIndex].title
          user.type = types
          break
      }
      updateUser(this, user)
    },
    wxcButtonClicked () {
      userLogout(this)
    }
  }
}
</script>

<style scoped>
  .panel {
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0;
    background-color: #C6e2FF;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
  .gridSelect {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .submits{
    position: relative;
    left: 23px;
    top: 1px;
  }
  .red{
    text-align: left;
  }
  .demo-title {
    font-size: 28px;
    background-color: #C6E2FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
  }
  .category {
    margin-top: 91px;
  }
</style>
