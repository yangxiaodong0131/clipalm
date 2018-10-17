<template>
  <div class="container">
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
      src: 'https//gw.alicdn.com/tfs/TB1RRVWQXXXXXasXpXXXXXXXXXX-24-22.png',
      style: {
        height: 22
      }
    }, {
      type: 'text',
      value: '论坛话题',
      theme: 'yellow'
    }, {
      type: 'link',
      value: '自定义颜色link',
      href: '//h5.m.taobao.com',
      style: {
        color: '#546E7A'
      }
    }, {
      type: 'tag',
      value: '满100减20',
      theme: 'red'
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
        value: '自由行',
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
