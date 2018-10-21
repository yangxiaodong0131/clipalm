<template>
  <div class="panel">
    <wxc-minibar :title="user.username"
      leftButton = ""
      background-color="#009ff0"
      text-color="#FFFFFF"
      right-text="返回登陆"
      @wxcMinibarRightButtonClicked="minibarRightButtonClick">
    </wxc-minibar>
    <category title="--选择用户功能--"></category>
    <wxc-grid-select
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_1"
      @select="params => onSelect(params, 'user')">
    </wxc-grid-select>
    <category title="--选择字典版本--"></category>
    <wxc-grid-select
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_2"
      @select="params => onSelect(params, 'version')">
    </wxc-grid-select>
    <category title="--选择MDC修订--"></category>
    <wxc-grid-select
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="mdcs"
      @select="params => onSelect(params, 'mdc')">
    </wxc-grid-select>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect } from 'weex-ui'
import Category from '../common/category.vue'

export default {
  name: 'user-doc',
  components: { WxcMinibar, WxcGridSelect, Category },
  data: () => ({
    list_1: [
      { title: '专家用户', value: 1, checked: true },
      { title: '机构用户', value: 2 },
      { title: '个人用户', value: 3 }
    ],
    list_2: [
      { title: 'BJ编码版', value: 1, checked: true },
      { title: 'GB编码版', value: 2 },
      { title: 'CC编码版', value: 3 },
      { title: '术语版', value: 4 }
    ],
    customStyles: {
      lineSpacing: '14px',
      width: '120px',
      height: '50px',
      icon: '',
      color: '#333333',
      checkedColor: '#ffffff',
      disabledColor: '#eeeeee',
      borderColor: '#666666',
      checkedBorderColor: '#ffb200',
      backgroundColor: '#ffffff',
      checkedBackgroundColor: '#ffb200'
    }
  }),
  computed: {
    user: {
      get () {
        return this.$store.state.Home.user.data
      }
    },
    mdcs: {
      get () {
        const arr = this.$store.state.Home.user.data.mdc
        if (arr) {
          console.log(arr)
          return arr.map((value, index) => { return {'title': 'MDC' + value} })
        }
        return []
      }
    }
  },
  methods: {
    minibarRightButtonClick (e) {
      this.$store.commit('SET_menu', [0, '用户登陆'])
    },
    onSelect (params, type) {
      console.log(type)
      console.log(params)
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
