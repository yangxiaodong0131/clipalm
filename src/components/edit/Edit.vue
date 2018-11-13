<template>
  <div class="demo" @swipe="swipe" v-bind:style="panel">
    <text class="demo-title">{{title}}</text>
    <!-- <div class="special-rich" v-for="(specialList, index) in specialConfigList" v-bind:key="index">
      <div class="panel" @click="wxcRichTextLinkClick(index)">
        <wxc-rich-text :config-list="specialList"></wxc-rich-text>
      </div>
    </div> -->
    <list class="list" @loadmore="fetch" loadmoreoffset="20">
      <cell class="cell" v-for="(wt4, index) in wt4Case" v-bind:key="index" @longpress="test">
        <div class="panel" @longpress="longpress(wt4)">
          <wxc-cell
            :label="wt4.disease_name"
            :has-margin="false"
            :has-arrow="true"
            :arrow-icon="arrawSrc"
            @wxcCellClicked="wxcCellClicked(wt4)"
            :extraContent="wt4.extraContent">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <mini-bar :title="menu"></mini-bar>
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
    menu: {
      get () {
        const i = this.$store.state.Home.activeTab
        const menu = this.$store.state.Home.menu[i]
        return menu
      }
    },
    wt4Case: {
      get () {
        const data = this.$store.state.Edit.wt4Case.map((x) => {
          const obj = x
          let extraContent = ``
          switch (this.$store.state.Home.menu[1]) {
            case '未入组病历':
              extraContent = `${x.diags_code}`
              break
            case 'QY病历':
              extraContent = `${x.opers_code}`
              break
            case '费用异常病历':
              extraContent = `${x.total_expense}元·入组DRG平均费用`
              break
            default:
              extraContent = `${x.gender}·${x.age}岁·${x.total_expense}元·${x.acctual_days}天·${x.drg}`
          }
          if (extraContent === '') {
            obj.extraContent = '无'
          } else {
            obj.extraContent = extraContent
          }
          return obj
        })
        console.log(data)
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
      getServer(this, 'all', this.$store.state.Edit.editMenu)
    },
    test () {
      console.log('dasdas')
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
</style>
