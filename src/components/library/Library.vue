<template>
  <div class="container" v-bind:class="container">
    <div v-if="!show">
      <list class="list" @loadmore="fetch" loadmoreoffset="30000">
        <cell class="cell" v-for="(rule, index) in rules" v-bind:key="index">
          <wxc-cell :label="rule.code"
                    @wxcCellClicked="wxcIndexlistItemClicked(rule)"
                    :has-margin="false"
                    :has-arrow="true"
                    :arrow-icon="arrawSrc"
                    :extraContent="rule.desc"></wxc-cell>
        </cell>
        <cell style="height:200px" v-if="rules.length !== 0">
          <wxc-button text="加载更多"
            class="submits"
            size="big"
            @wxcButtonClicked="fetch"></wxc-button>
        </cell>
      </list>
      <mini-bar :title="menu" rightIcon="home"></mini-bar>
    </div>
    <pop-right v-if="show" :page="page"></pop-right>
  </div>
</template>

<script>
import { WxcCell, WxcButton } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
import PopRight from '../common/PopRight.vue'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcCell, MiniBar, PopRight, WxcButton },
  data () {
    return {
      height: 400,
      isShow: false,
      arrawSrc: 'http://210.75.199.113/images/more.png',
      show: false,
      page: {}
    }
  },
  created () {
    this.getData()
  },
  computed: {
    activeTab: {
      get () {
        return this.$store.state.Home.activeTab
      }
    },
    menu: {
      get () {
        return this.$store.state.Home.menu[this.activeTab]
      }
    },
    rules: {
      get () {
        return this.$store.state.Library.rule
      }
    },
    container: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          height: tabPageHeight
        }
        return style
      }
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
          type = 'MDC规则详情'
          break
        default:
          type = this.menu
      }
      const details = getDetails(type, e)
      this.show = true
      this.page = details
      // this.$store.commit('SET_infoLevel', 1)
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
