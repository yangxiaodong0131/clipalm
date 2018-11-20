<template>
  <div class="panel" v-bind:style="panel">
    <div v-for="(value, key) in userAnalyse" v-bind:key="key">
      <category class="category" :title="`--${key}--`"></category>
      <wxc-cell v-for="(data, index) in value"
        v-bind:key="`${key}-${index}`"
        :label="data.type"
        :title="`${data.count}`"
        :has-arrow="false"
        :has-margin="true"></wxc-cell>
    </div>
    <mini-bar title="用户分析" rightIcon="table"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { analyse } from '../../utils/user'

export default {
  name: 'user-doc',
  components: { WxcMinibar, WxcGridSelect, Category, WxcButton, WxcCell, MiniBar },
  data: () => ({
  }),
  computed: {
    userAnalyse: {
      get () {
        console.log(this.$store.state.Home.userAnalyse)
        return this.$store.state.Home.userAnalyse
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
  created () {
    this.getAnalyse()
  },
  methods: {
    getAnalyse () {
      analyse(this)
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
