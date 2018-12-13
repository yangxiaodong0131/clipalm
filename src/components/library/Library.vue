<template>
  <div class="container" v-bind:class="container">
    <list class="list" @loadmore="fetch" loadmoreoffset="0" v-if="showData">
      <cell class="cell" v-for="(rule, index) in rules" v-bind:key="index">
        <wxc-cell :label="rule.code"
                  @wxcCellClicked="wxcIndexlistItemClicked(rule)"
                  :has-margin="false"
                  :has-arrow="true"
                  :arrow-icon="arrawSrc"
                  :extraContent="rule.desc"></wxc-cell>
      </cell>
      <cell style="height:200px">
        <wxc-button text="加载更多"
          class="submits"
          size="big"
          v-if="showMore"
          @wxcButtonClicked="fetch"></wxc-button>
      </cell>
    </list>
    <list class="list" loadmoreoffset="20" v-else>
      <cell>
        <div class="panel" @longpress="longpress(wt4)">
          <wxc-cell
            title="此版本无数据"
            :has-margin="false"
            :has-arrow="false"
            :desc="`当前版本:${user.clipalm_year}-${user.type}-${user.clipalm_version}-${user.clipalm_icd}`">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
  </div>
</template>

<script>
import { WxcCell, WxcButton } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
import PopRight from '../common/PopRight.vue'
// const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  components: { WxcCell, MiniBar, PopRight, WxcButton },
  data () {
    return {
      height: 400,
      isShow: false,
      arrawSrc: icon['more'],
      show: false,
      page: {}
    }
  },
  created () {
    this.getData()
  },
  computed: {
    user () {
      return this.$store.state.Home.user.data
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    showData () {
      return this.$store.state.Home.showData
    },
    showMore () {
      return this.$store.state.Home.showMore
    },
    rules () {
      return this.$store.state.Library.rule
    },
    container () {
      const tabPageHeight = weex.config.env.deviceHeight + 200
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  updated: function () {
  },
  methods: {
    getData () {
      if (this.rules.length === 0) {
        getServer(this, this.activeTab, this.menu)
      }
    },
    wxcIndexlistItemClicked (e) {
      let type = ''
      switch (this.menu) {
        case 'CN-DRG':
          type = 'MDC'
          break
        default:
          type = this.menu
      }
      console.log(e)
      const details = getDetails(this, type, e)
      this.show = true
      this.page = details
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      if (this.menu !== 'MDC') {
        this.$store.commit('SET_libraryPage', this.$store.state.Library.page + 1)
        getServer(this, this.activeTab, this.menu)
      }
    }
  }
}
</script>
<style scoped>
  .container {
    width: 750px;
  }
  .list {
    margin-top: 91px;
  }
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
</style>
