<template>
  <!-- <div class="panel" v-bind:style="panel">
    <category class="category" :title="`用户积分信息`"></category>
    <text class="bpStyle">当前积分：{{user.bp}}</text>
    <category title="--选择用户功能--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_1"
      @select="params => onSelect(params, 'user')">
    </wxc-grid-select>
    <category title="--选择字典--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_2"
      @select="params => onSelect(params, 'version')">
    </wxc-grid-select>
    <category title="--选择ICD版本--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_3"
      @select="params => onSelect(params, 'icd')">
    </wxc-grid-select>
    <category title="--选择DRG版本--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_4"
      @select="params => onSelect(params, 'drg')">
    </wxc-grid-select>
    <div style="height:20px;"></div>
    <wxc-button text="退出登录"
        size="full"
        class="submits"
        type="blue"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    <mini-bar :title="`用户信息-${user.username}`" rightIcon="table" leftIcon="setting" :rightButtonShow="rightButtonShow"></mini-bar>
  </div> -->
  <div class="panel" v-bind:style="panel">
    <div style="height: 91px;"></div>
    <!-- <category title="--选择用户功能--"></category> -->
    <!-- <category title="--选择字典--"></category> -->
    <am-list style="width:750px;">
      <div style="height:20px;"></div>
      <am-list-item
          title="用户名"
          arrow="empty"
          :extra="`${user.username}`"></am-list-item>
      <am-picker
        title="请选择"
        :placeholder="user.type"
        :data="types"
        @ok="typeOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="用户"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <div style="height:35px;"></div>
      <am-picker
        title="请选择"
        :placeholder="user.clipalm_icd"
        :data="icds"
        @ok="icdOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="ICD"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <am-picker
        title="请选择"
        :placeholder="user.clipalm_version"
        :data="versions"
        @ok="versionOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="版本"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <am-picker
        title="请选择"
        :placeholder="user.clipalm_year"
        :data="year"
        v-model="value4"
        @ok="yearOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="时间"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <div style="height:35px;"></div>
    <!-- <wxc-cell label="完善用户信息"
                :has-arrow="true"
                style="width:750px;"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell> -->
      <am-list-item
        title="用户积分"
        :extra="`${user.bp}`"
        arrow="empty"
        ></am-list-item>
      <div style="height:35px;"></div>
      <am-list-item
        title="完善用户信息"
        @click="click"></am-list-item>
  <div style="height:40px;"></div>
    <am-list-item
      title="                                  退出登录"
      arrow="empty"
      class="bnt"
      style="width:750px;"
      @click="wxcButtonClicked"></am-list-item>
  </am-list>
  <!-- <wxc-button text="退出登录"
      size="full"
      class="submits"
      type="blue"
      @wxcButtonClicked="wxcButtonClicked"></wxc-button> -->
  <mini-bar title="用户信息" rightIcon="table" leftIcon="setting" :rightButtonShow="rightButtonShow"></mini-bar>
  </div>
  </template>

<script>
import { AmPicker, AmList, AmListItem, AmButton } from 'weex-amui'
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { userLogout, updateUser } from '../../utils/user'
const modal = weex.requireModule('modal')

export default {
  name: 'user-doc',
  components: { AmPicker, AmList, AmListItem, WxcMinibar, WxcGridSelect, Category, AmButton, WxcButton, WxcCell, MiniBar },
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
    },
    show: false,
    value: [],
    value1: [],
    value2: [],
    value3: [],
    value4: [],
    types: [{ value: '专家用户', label: '专家用户' }, { value: '机构用户', label: '机构用户' }, { value: '个人用户', label: '个人用户' }],
    versions: [{ label: 'BJ编码版', value: 'BJ编码版' }, { label: 'GB编码版', value: 'GB编码版' }, { label: '术语版', value: '术语版' }],
    icds: [{ label: 'ICD10 6.0', value: 'ICD10 6.0' }, { label: 'ICD10 5.0', value: 'ICD10 5.0' }],
    year: [{ label: '2013', value: '2013' }, { label: '2014', value: '2014' }, { label: '2015', value: '2015' }, { label: '2016', value: '2016' }, { label: '2017', value: '2017' }, { label: '2018', value: '2018' }]
  }),
  computed: {
    user: {
      get () {
        return this.$store.state.Home.user.data
      }
    },
    rightButtonShow: {
      get () {
        return this.user.admin
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
    yearOk (year, labels) {
      console.log(labels)
      const user = {}
      user.clipalm_year = labels[0]
      updateUser(this, user)
    },
    typeOk (type, labels) {
      console.log(labels)
      const user = {}
      user.type = labels[0]
      updateUser(this, user)
    },
    versionOk (version, labels) {
      const user = {}
      user.clipalm_version = labels[0]
      updateUser(this, user)
    },
    icdOk (icd, labels) {
      const user = {}
      user.clipalm_icd = labels[0]
      updateUser(this, user)
    },
    click () {
      this.$store.commit('SET_menu', [0, '完善个人信息'])
    },
    onHide (type) {
      console.log('hide')
      // console.log('hide', type)
    },
    onSelect (params, type) {
      const user = {}
      if (type === 'user') {
        this.list_1[params.selectIndex].checked = true
      } else {
        switch (type) {
          case 'mdc':
            const mdc = this.mdcs[params.selectIndex].title
            this.$store.commit('SET_mdc', mdc)
            user.clipalm_mdc = mdc
            break
          case 'version':
            const version = this.list_2[params.selectIndex].title
            user.clipalm_version = version
            modal.toast({ message: `已设置${version}为默认查询版本`, duration: 1 })
            break
          // case 'user':
            // const types = this.list_1[params.selectIndex].title
            // user.type = types
            // break
          case 'icd':
            const icd = this.list_3[params.selectIndex].title
            user.icd_version = icd
            break
          case 'drg':
            const drg = this.list_4[params.selectIndex].title
            user.clipalm_year = drg
            break
        }
        updateUser(this, user)
      }
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
    background-color: #F8F8FF;
    width: 750px;
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
    background-color: #F8F8FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
  }
  .category {
    margin-top: 91px;
  }
  .bpStyle {
    font-size: 30px;
    margin: 10 0 10 30;
  }
  .bnt {
    width: 750px;
  }
</style>
