<template>
  <div class="container">
    <wxc-indexlist :normal-list="stats"
                   @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                   :show-index="true"></wxc-indexlist>
    <wxc-popup popup-color="#FFFFFF"
                :show="isBottomShow"
                @wxcPopupOverlayClicked="popupOverlayBottomClick"
                pos="right"
                width="540">
      <div class="demo-content">
        <wxc-cell label="编码"
          :title="info.code"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="名称"
          :title="info.desc"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="费用变异系数"
          :title="info.fee_cv"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="时间变异系数"
          :title="info.day_cv"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="死亡风险等级"
          :title="info.death_level"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="权重"
          :title="info.weight"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="平均费用"
          :title="info.fee_avg"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="平均住院天数"
          :title="info.day_avg"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
        <wxc-cell label="病历数"
          :title="info.num_sum"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked"
          :has-margin="true"></wxc-cell>
      </div>
    </wxc-popup>
 </div>

</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell } from 'weex-ui'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell },
  created: function () {
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {}
    }
  },
  computed: {
    stats: {
      get () {
        return this.$store.state.Stat.statDrg
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      const details = [
        {'label': '编码', 'title': 'code'},
        {'label': '名称', 'title': 'desc'},
        {'label': '费用变异系数', 'title': 'fee_cv'},
        {'label': '时间变异系数', 'title': 'day_cv'},
        {'label': '死亡风险等级', 'title': 'death_level'},
        {'label': '权重', 'title': 'weight'},
        {'label': '平均费用', 'title': 'fee_avg'},
        {'label': '平均住院天数', 'title': 'day_avg'},
        {'label': '病历数', 'title': 'num_sum'}]
      this.$store.commit('SET_buttonText', '')
      this.$store.commit('SET_gridList', [])
      this.$store.commit('SET_details', details)
    },
    openBottomPopup () {
      this.isBottomShow = true
    },
    popupOverlayBottomClick () {
      this.isBottomShow = false
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
</style>
