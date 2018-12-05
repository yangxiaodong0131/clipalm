<template>
  <div class="demo">
    <am-nav-bar title="am-nav-bar"></am-nav-bar>
    <scroller>
      <am-white-space></am-white-space>
      <am-nav-bar
        title="标题"
        :right-btn="[{is: 'icon', text: '编辑', key: '\ue617'}]"
        @click="handleClick"
      ></am-nav-bar>
      <am-icon font-family="myIcon" :type="'\ue617'"></am-icon>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
  .demo {
    background-color: #f5f5f9;
  }
</style>

<script>
import { AmNavBar, AmWhiteSpace, AmIcon } from 'weex-amui'
const modal = weex.requireModule('modal')
export default {
  components: { AmNavBar, AmWhiteSpace, AmIcon },
  beforeCreate () {
    // // 添加自己的图标文件
    // dom.addRule('fontFace', {
    //   'fontFamily': 'myIcon', // 与 <am-icon/> 组件的 fontFamily 属性对应
    //   'src': "url('https://at.alicdn.com/t/font_942818_722e6k5vhi7.ttf')"
    // })
  },
  methods: {
    handleClick (value) {
      modal.toast({
        message: value
      })
    }
  }
}
</script>
