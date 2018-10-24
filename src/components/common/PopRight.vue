<template>
  <div class="demo"
    :show="isBottomShow" @swipe="swipe">
      <text class="demo-title">{{wxcCellTitle}}</text>
      <wxc-button :text="button"
            v-if="isInfoButtonShow"
            size="big"
            @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      <div class="demo-content">
        <wxc-cell v-for="(detail, index) in details"
          :key="index"
          :label="detail.label"
          :title="info[detail.title]"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked(detail)"
          :has-margin="true"></wxc-cell>
        <wxc-grid-select
            :single="true"
            :cols="3"
            :list="gridList"></wxc-grid-select>
      </div>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcGridSelect } from 'weex-ui'
import { getServer } from '../../utils/server'

export default {
  components: { WxcPopup, WxcCell, WxcButton, WxcGridSelect },
  data () {
    return {
      // isBottomShow: false
    }
  },
  computed: {
    wxcCellTitle () {
      return this.$store.state.Home.infoTitle
    },
    details () {
      return this.$store.state.Home.details
    },
    gridList () {
      return this.$store.state.Home.gridList
    },
    button () {
      return this.$store.state.Home.buttonText
    },
    isBottomShow () {
      return this.$store.state.Home.isBottomShow
    },
    isInfoButtonShow () {
      return this.$store.state.Home.isInfoButtonShow
    },
    info () {
      return this.$store.state.Home.info
    }
  },
  methods: {
    wxcRichTextLinkClick () {
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_isBottomShow', false)
    },
    wxcCellClicked (detail) {
      // this.$store.commit('SET_visible', false)
      // const i = this.$store.state.Home.activeTab
      // this.$store.commit('SET_menu', [i, '数据详情'])
      // this.$store.commit('SET_isBottomShow', true)
      // this.$store.commit('SET_info', e)
      // this.$store.commit('SET_infoTitle', '病案详情')
      // this.$store.commit('SET_isInfoButtonShow', false)
      // this.$store.commit('SET_lastPages', [this.$store.state.Edit.editMenu, 'push'])
      // const button = ''
      // const gridList = []
      // const details = [
      //   {'label': '入组DRG', 'title': 'drg'},
      //   {'label': '病案ID', 'title': 'b_wt4_v1_id'},
      //   {'label': '主要诊断编码', 'title': 'disease_code'},
      //   {'label': '主要诊断名称', 'title': 'disease_name'},
      //   {'label': '其他诊断', 'title': 'diags_code'},
      //   {'label': '手术/操作', 'title': 'opers_code'},
      //   {'label': '住院天数', 'title': 'acctual_days'},
      //   {'label': '住院总费用', 'title': 'total_expense'},
      //   {'label': '性别', 'title': 'gender'},
      //   {'label': '年龄', 'title': 'age'},
      //   {'label': '新生儿天数', 'title': 'sf0100'},
      //   {'label': '新生儿体重', 'title': 'sf0102'},
      //   {'label': '呼吸机使用时间', 'title': 'sf0104'},
      //   {'label': '出院转归', 'title': 'sf0108'},
      //   {'label': '分组日志', 'title': 'log'}]
      // this.$store.commit('SET_buttonText', button)
      // this.$store.commit('SET_gridList', gridList)
      // this.$store.commit('SET_details', details)
      let infoTitle = ''
      let menu = ''
      let details = ''
      switch (detail.label) {
        case '入组DRG':
          infoTitle = `${detail.label}-${this.info[detail.title]}-详情`
          menu = `${this.wxcCellTitle}`
          this.$store.commit('SET_isInfoButtonShow', false)
          details = [
            {'label': '编码', 'title': 'code'},
            {'label': '名称', 'title': 'desc'},
            {'label': '费用变异系数', 'title': 'fee_cv'},
            {'label': '时间变异系数', 'title': 'day_cv'},
            {'label': '死亡风险等级', 'title': 'death_level'},
            {'label': '权重', 'title': 'weight'},
            {'label': '平均费用', 'title': 'fee_avg'},
            {'label': '平均住院天数', 'title': 'day_avg'},
            {'label': '病历数', 'title': 'num_sum'}]
          getServer(this, 'statOne', 'info', this.info[detail.title])
          break
        default:
          break
      }
      this.$store.commit('SET_lastPages', [menu, 'push'])
      this.$store.commit('SET_infos', [this.$store.state.Home.info, 'push'])
      this.$store.commit('SET_gridList', [])
      this.$store.commit('SET_details', details)
      this.$store.commit('SET_infoTitle', infoTitle)
      // console.log(detail.title)
      // console.log(this.info[detail.title])
      // this.$store.commit('SET_isBottomShow', true)
      // this.info = mdc
    },
    wxcButtonClicked () {
      let menu = ''
      let type = ''
      switch (this.$store.state.Home.activeTab) {
        case 2:
          switch (this.$store.state.Library.libraryMenu) {
            case 'MDC':
              menu = 'ADRG'
              type = 'adrgOne'
              break
            case 'ADRG':
              menu = 'DRG'
              type = 'drgOne'
              break
          }
          break
        default :
          break
      }
      this.$store.commit('SET_isBottomShow', false)
      this.$store.commit('SET_menu', menu)
      getServer(this, type, menu, this.info)
    },
    swipe (e) {
      if (e.direction === 'right') {
        const i = this.$store.state.Home.activeTab
        const lastPage = this.$store.state.Home.lastPages[this.$store.state.Home.lastPages.length - 1]
        const info = this.$store.state.Home.infos[this.$store.state.Home.infos.length - 1]
        let details = []
        switch (lastPage) {
          case '病案详情':
            details = [
              {'label': '入组DRG', 'title': 'drg'},
              {'label': '病案ID', 'title': 'b_wt4_v1_id'},
              {'label': '主要诊断编码', 'title': 'disease_code'},
              {'label': '主要诊断名称', 'title': 'disease_name'},
              {'label': '其他诊断', 'title': 'diags_code'},
              {'label': '手术/操作', 'title': 'opers_code'},
              {'label': '住院天数', 'title': 'acctual_days'},
              {'label': '住院总费用', 'title': 'total_expense'},
              {'label': '性别', 'title': 'gender'},
              {'label': '年龄', 'title': 'age'},
              {'label': '新生儿天数', 'title': 'sf0100'},
              {'label': '新生儿体重', 'title': 'sf0102'},
              {'label': '呼吸机使用时间', 'title': 'sf0104'},
              {'label': '出院转归', 'title': 'sf0108'},
              {'label': '分组日志', 'title': 'log'}]
            break
          default:
            this.$store.commit('SET_menu', [i, lastPage])
            break
        }
        this.$store.commit('SET_details', details)
        this.$store.commit('SET_lastPages', [lastPage, 'filter'])
        this.$store.commit('SET_infos', [info, 'filter'])
      }
    }
  }
}
</script>
<style scoped>
  .wxc-demo {
    width: 750px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }
  .container {
    flex: 1;
  }
  .demo {
    width: 750px;
    background-color: #f2f3f4;
  }
  .category {
    margin-top: 40px;
  }
  .default {
    color: #000000;
  }
  .active {
    color: #FFC900;
  }
  .red {
    color: #C3413D;
  }
  .image {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .demo-title {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 16px;
  }
</style>
