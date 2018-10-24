<template>
  <div class="demo" @swipe="swipe">
    <text class="demo-title">{{wxcCellTitle}}</text>
    <wxc-cell v-for="wt4 in wt4Case"
              v-bind:key="wt4.id"
              :label="wt4.drg"
              @wxcCellClicked="wxcCellClicked(wt4)"
              :has-margin="false"
              :extraContent="wt4.extraContent"></wxc-cell>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading },
  data () {
    return {
      forceValue: 0
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
      const details = getDetails(menu)
      this.$store.commit('SET_infoPage', details)
      this.$store.commit('SET_info', e)
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
