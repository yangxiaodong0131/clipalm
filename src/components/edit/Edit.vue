<template>
  <div class="demo" @swipe="swipe" style="height:1000px;">
    <text class="demo-title">{{wxcCellTitle}}</text>
    <list class="list" @loadmore="fetch" loadmoreoffset="20">
      <cell class="cell" v-for="(num, index) in wt4Case" v-bind:key="index">
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
      if (e.direction === 'left' && this.$store.state.Home.infoPage1.info !== '') {
        this.$store.commit('SET_infoMenu', this.wxcCellTitle)
        this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '病案详情'])
        this.$store.commit('SET_infoLevel', 1)
      }
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      getServer(this, 'all', this.$store.state.Edit.editMenu)
      modal.toast({ message: '加载下一页', duration: 1 })
    }
  }
}
</script>

<style scoped>
  .demo-title {
    font-size: 30px;
  }
  .demo {
    width: 750px;
    height: 1250px;
    margin-top: 91px;
  }
</style>
