<template>
  <div class="demo" @swipe="swipe" style="height:1000px;">
    <text class="demo-title">{{wxcCellTitle}}</text>
    <!-- <wxc-cell v-for="wt4 in wt4Case"
              v-bind:key="wt4.id"
              :label="wt4.drg"
              @wxcCellClicked="wxcCellClicked(wt4)"
              :has-margin="false"
              :extraContent="wt4.extraContent"></wxc-cell>
  </div> -->
  <list class="list" @loadmore="fetch" loadmoreoffset="20">
    <cell class="cell" v-for="num in wt4Case" v-bind:key="num.id">
      <wxc-cell
                :label="num.drg"
                @wxcCellClicked="wxcCellClicked(num)"
                :has-margin="false"
                :extraContent="num.extraContent"></wxc-cell>
    </cell>
  </list>
</div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'
const modal = weex.requireModule('modal')
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton },
  data () {
    return {
      forceValue: 0,
      refreshing: false
    }
  },
  created () {
  },
  computed: {
    wt4Case: {
      get () {
        const data = this.$store.state.Edit.wt4Case.map((x) => {
          const obj = x
          obj.extraContent = `${x.gender}·${x.age}岁·${x.total_expense}元·${x.acctual_days}天·${x.disease_code}`
          return obj
        })
        return data
      }
    },
    wxcCellTitle: {
      get () {
        return this.$store.state.Edit.editMenu
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      this.$store.commit('SET_visible', false)
      this.$store.commit('SET_isBottomShow', true)
      const i = this.$store.state.Home.activeTab
      const menu = '病案详情'
      this.$store.commit('SET_menu', [i, menu])
      this.$store.commit('SET_infoMenu', this.wxcCellTitle)
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails(menu, e)
      this.$store.commit('SET_infoPage', details)
      // this.$store.commit('SET_info', e)
    },
    swipe (e) {
      const page = this.$store.state.Edit.wt4Page
      if (e.direction === 'up') {
        this.$store.commit('SET_wt4Page', page + 1)
        getServer(this, 'all', this.$store.state.Edit.editMenu)
      } else if (e.direction === 'left' && this.$store.state.Home.infoPage1.info !== '') {
        this.$store.commit('SET_infoMenu', this.wxcCellTitle)
        this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '病案详情'])
        this.$store.commit('SET_infoLevel', 1)
      }
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      getServer(this, 'all', this.$store.state.Edit.editMenu)
      modal.toast({ message: '加载下一页', duration: 1 })
      // setTimeout(() => {
      //   const length = this.lists.length
      //   for (let i = length; i < length + LOADMORE_COUNT; ++i) {
      //     this.lists.push(i + 1)
      //   }
      // }, 800)
    }
  }
}
</script>

<style scoped>
  .refresh {
    width: 750;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }
  .panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
