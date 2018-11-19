<template>
  <div class="demo" @swipe="swipe" v-bind:style="panel">
    <text class="demo-title"  v-if="wt4Case.length !== 0">{{title}}</text>
    <list class="list" @loadmore="fetch" loadmoreoffset="20">
      <cell class="cell" v-for="(wt4, index) in wt4Case" v-bind:key="index" @longpress="test">
        <div class="panel" @longpress="longpress(wt4)">
          <wxc-cell
            :title="wt4.disease_name"
            :desc="wt4.extraContent"
            :has-margin="false"
            :has-arrow="true"
            :arrow-icon="arrawSrc"
            @wxcCellClicked="wxcCellClicked(wt4)">
          </wxc-cell>
        </div>
      </cell>
      <cell style="height:200px" v-if="wt4Case.length !== 0">
        <wxc-button text="加载更多"
          class="submits"
          size="big"
          @wxcButtonClicked="fetch"></wxc-button>
      </cell>
    </list>
    <mini-bar :title="menu" rightIcon="home"></mini-bar>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'
import MiniBar from '../common/MiniBar.vue'
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton, MiniBar },
  data () {
    return {
      forceValue: 0,
      refreshing: false,
      arrawSrc: 'http://210.75.199.113/images/more.png'
    }
  },
  created () {
    this.getData()
  },
  computed: {
    specialConfigList () {
      const configs = []
      this.wt4Case.map((x) => {
        console.log(x)
        const config = [
          {
            type: 'tag',
            value: '诊断编码:',
            style: {
              fontSize: 34,
              color: '#3D3D3D',
              borderColor: '#FFC900',
              backgroundColor: '#FFC900',
              borderRadius: 14
            }
          },
          {
            type: 'text',
            value: x.disease_code,
            theme: 'black',
            style: { fontSize: 35 }
          },
          {
            type: 'tag',
            value: '诊断名称:',
            style: {
              fontSize: 34,
              color: '#3D3D3D',
              borderColor: '#FFC900',
              backgroundColor: '#FFC900',
              borderRadius: 14
            }
          },
          {
            type: 'text',
            value: x.disease_name,
            theme: 'black',
            style: { fontSize: 35 }
          }
        ]
        configs.push(config)
      })
      return configs
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    wt4Case: {
      get () {
        const data = this.$store.state.Edit.wt4Case.map((x) => {
          const obj = x
          let extraContent = ``
          let value = ''
          switch (this.$store.state.Home.menu[1]) {
            case '未入组病历':
              if (x.diags_code.length > 50) {
                value = x.diags_code.substr(0, 50)
              } else {
                value = x.diags_code
              }
              extraContent = `其他诊断：${value}`
              break
            case 'QY病历':
              if (x.opers_code.length > 50) {
                value = x.opers_code.substr(0, 50)
              } else {
                value = x.opers_code
              }
              extraContent = `其他手术：${value}`
              break
            case '费用异常病历':
              if (x.total_expense.length > 50) {
                value = x.total_expense.substr(0, 50)
              } else {
                value = x.total_expense
              }
              extraContent = `总费用：${value}元·入组DRG平均费用`
              break
            default:
              extraContent = `性别：${x.gender}·年龄：${x.age}岁·费用：${x.total_expense}元·住院天数：${x.acctual_days}天·drg：${x.drg}`
              if (extraContent.length > 50) {
                extraContent = extraContent.substr(0, 50)
              }
          }
          if (extraContent === '') {
            obj.extraContent = '无'
          } else {
            obj.extraContent = extraContent
          }
          return obj
        })
        return data
      }
    },
    title: {
      get () {
        const data = this.$store.state.Edit.wt4Info
        return `病历数:${data.count} 平均费用${data.fee_avg} 平均住院天数${data.day_avg}`
      }
    },
    panel: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          height: tabPageHeight
        }
        return style
      }
    }
  },
  methods: {
    wxcRichTextLinkClick () {},
    getData () {
      const i = this.$store.state.Home.activeTab
      const menu = this.$store.state.Home.menu[i]
      if (this.wt4Case.length === 0) {
        getServer(this, i, menu)
      }
    },
    wxcCellClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails('病案详情', e)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      getServer(this, this.activeTab, this.menu)
    }
  }
}
</script>

<style scoped>
  .demo-title {
    font-size: 28px;
    background-color: #C6E2FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
    margin-top: 91px;
  }
  .demo {
    width: 750px;
  }
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
</style>
