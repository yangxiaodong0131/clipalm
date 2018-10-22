<template>
  <div class="panel">
    <wxc-rich-text :config-list="configList"
                   @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-rich-text>
    <div class="special-rich">
       <wxc-special-rich-text :config-list="specialConfigList"></wxc-special-rich-text>
    </div>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText } from 'weex-ui'

export default {
  components: { WxcRichText, WxcSpecialRichText },
  data: () => ({
    configList: [{
      type: 'icon',
      src: '//gw.alicdn.com/tfs/TB1RRVWQXXXXXasXpXXXXXXXXXX-24-22.png',
      style: {
        height: 22
      }
    }, {
      type: 'text',
      value: '论坛话题',
      theme: 'yellow'
    }, {
      type: 'tag',
      value: '自定义标签',
      style: {
        fontSize: 26,
        color: '#ffffff',
        borderColor: '#3d3d3d',
        backgroundColor: '#546E7A',
        height: 36
      }
    }],
    specialConfigList: [
      {
        type: 'tag',
        value: '论坛话题',
        style: {
          fontSize: 24,
          color: '#3D3D3D',
          borderColor: '#FFC900',
          backgroundColor: '#FFC900',
          borderRadius: 14
        }
      },
      {
        type: 'text',
        value: '春秋旅游广州-泰国曼谷6天往返单机票自由行自由春秋旅游广州-泰国曼谷6天往返单机票自由行自由行…',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }
    ]
  }),
  methods: {
    wxcRichTextLinkClick () {}
  }
}
</script>

<style scoped>
  .wrapper {
    /* flex-direction: column; */
    justify-content: center;
  }
  .panel {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
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
</style>
