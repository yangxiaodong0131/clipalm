<template>
  <div>
    <wxc-cell v-for="(wt4Case, i) in wt4Cases"
              v-bind:key="i"
              :label="wt4Case.disease_code"
              :title="wt4Case.mix"
              :has-arrow="true"
              @wxcCellClicked="wxcCellClicked(i)"
              :has-margin="true"></wxc-cell>
    <wxc-popup popup-color="#FFFFFF"
                :show="isBottomShow"
                @wxcPopupOverlayClicked="popupOverlayBottomClick"
                pos="right"
                width="540">
      <div class="demo-content">
        <wxc-cell label="年龄"
          :title="specialConfigList.age"
          :has-arrow="false"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="性别"
          :title="specialConfigList.gender"
          :has-arrow="false"
          :has-margin="true"></wxc-cell>
          <!-- total_expense
          diags_code
          opers_code
          gender -->
        <wxc-cell label="其他诊断"
          :title="specialConfigList.diags_code"
          :has-arrow="false"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="其他手术"
          :title="specialConfigList.opers_code"
          :has-arrow="false"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="总费用"
          :title="specialConfigList.total_expense"
          :has-arrow="false"
          :has-margin="true"></wxc-cell>
      </div>
      <!-- <div class="special-rich">
        <wxc-special-rich-text :config-list="specialConfigList"></wxc-special-rich-text>
      </div> -->
    </wxc-popup>
    <!-- <wxc-rich-text :config-list="configList"
                   @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-rich-text> -->
    <pop-bar></pop-bar>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell } from 'weex-ui'
import PopBar from '../PopBar'

export default {
  components: { PopBar, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell },
  data () {
    return {
      isBottomShow: false,
      specialConfigList: []
    }
  },
  // data: () => ({
  //   configList: [{
  //     type: 'icon',
  //     src: '//gw.alicdn.com/tfs/TB1RRVWQXXXXXasXpXXXXXXXXXX-24-22.png',
  //     style: {
  //       height: 22
  //     }
  //   }, {
  //     type: 'text',
  //     value: '黄色主题',
  //     theme: 'yellow'
  //   }, {
  //     type: 'link',
  //     value: '自定义颜色link',
  //     href: '//h5.m.taobao.com',
  //     style: {
  //       color: '#546E7A'
  //     }
  //   }, {
  //     type: 'tag',
  //     value: '满100减20',
  //     theme: 'red'
  //   }, {
  //     type: 'tag',
  //     value: '自定义标签',
  //     style: {
  //       fontSize: 26,
  //       color: '#ffffff',
  //       borderColor: '#3d3d3d',
  //       backgroundColor: '#546E7A',
  //       height: 36
  //     }
  //   }],
  //   specialConfigList: [
  //     {
  //       type: 'tag',
  //       value: '自由行',
  //       style: {
  //         fontSize: 24,
  //         color: '#3D3D3D',
  //         borderColor: '#FFC900',
  //         backgroundColor: '#FFC900',
  //         borderRadius: 14
  //       }
  //     },
  //     {
  //       type: 'text',
  //       value: '春秋旅游广州-泰国曼谷6天往返单机票自由行自由春秋旅游广州-泰国曼谷6天往返单机票自由行自由行…',
  //       theme: 'black',
  //       style: {
  //         fontSize: 28
  //       }
  //     }
  //   ]
  // }),
  computed: {
    wt4Case: {
      get () {
        return this.$store.state.Edit.wt4Case
      }
    },
    wt4Cases: {
      get () {
        const value = this.wt4Case.map((x) => {
          const obj = {}
          obj.disease_code = x.disease_code
          obj.mix = `${x.age},${x.total_expense},${x.diags_code},${x.opers_code},${x.gender}`
          return obj
        })
        return value
      }
    }
  },
  methods: {
    wxcRichTextLinkClick () {},
    wxcCellClicked (index) {
      this.isBottomShow = true
      console.log(index)
      console.log(this.wt4Case[index])
      this.specialConfigList = this.wt4Case[index]
      // this.specialConfigList = [{
      //   type: 'tag',
      //   value: this.wt4Case[index].total_expense,
      //   style: {
      //     fontSize: 24,
      //     color: '#3D3D3D',
      //     borderColor: '#FFC900',
      //     backgroundColor: '#FFC900',
      //     borderRadius: 14
      //   }
      // },
      // {
      //   type: 'tag',
      //   value: this.wt4Case[index].id,
      //   style: {
      //     fontSize: 24,
      //     color: '#3D3D3D',
      //     borderColor: '#FFC900',
      //     backgroundColor: '#FFC900',
      //     borderRadius: 14
      //   }
      // }]
    },
    popupOverlayBottomClick () {
      this.isBottomShow = false
    }
  }
}
</script>
