<template>
  <div class="panel">
    <wxc-simple-flow :list="testData" :themeColor="themeColor"></wxc-simple-flow>
    <!-- <pop-bar></pop-bar> -->
  </div>
</template>
<script>
import { WxcSimpleFlow } from 'weex-ui'
import PopBar from '../common/PopBar'
export default {
  components: { WxcSimpleFlow, PopBar },
  data: () => ({
    themeColor: {
      lineColor: '#bf280b',
      pointInnerColor: '#b95048',
      pointBorderColor: '#bf280b',
      highlightTitleColor: '#bf280b',
      highlightPointInnerColor: '#bf280b',
      highlightPointBorderColor: '#d46262'
    },
    testData: [
      {
        'date': '2017-05-24 21:10:29',
        'desc': '',
        'highlight': true,
        'title': '方案已确认'
      },
      {
        'date': '2017-05-24 19:54:28',
        'desc': '',
        'title': '方案已更新'
      },
      {
        'date': '2017-05-24 19:50:21',
        'desc': '您以确定了方案',
        'title': '方案已上传'
      },
      {
        'date': '2017-05-24 19:49:03',
        'desc': '商家会在2个工作小时内电话或旺旺联系您',
        'title': '商家已接单'
      }
    ]
  })
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
