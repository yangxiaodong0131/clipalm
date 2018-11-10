<template>
  <div class="container" v-bind:class="container">
      <list class="list" @loadmore="fetch" loadmoreoffset="30000">
        <cell class="cell" v-for="(rule, index) in rules" v-bind:key="index">
          <wxc-cell :label="rule.code"
                    @wxcCellClicked="wxcIndexlistItemClicked(rule)"
                    :has-margin="false"
                    :has-arrow="true"
                    :arrow-icon="arrawSrc"
                    :extraContent="rule.desc"></wxc-cell>
        </cell>
      </list>
  </div>
</template>

<script>
import { WxcCell } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcCell },
  data () {
    return {
      height: 400,
      isShow: false,
      arrawSrc: 'http://210.75.199.113/images/more.png'
    }
  },
  created () {
    this.getData()
  },
  computed: {
    menu: {
      get () {
        const i = this.$store.state.Home.activeTab
        const menu = this.$store.state.Home.menu[i]
        return menu
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
      const i = this.$store.state.Home.activeTab
      getServer(this, i, this.menu)
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_infoPage', getDetails(`${this.menu}规则详情`, e))
    },
    fetch () {
      if (this.menu !== 'MDC') {
        this.$store.commit('SET_libraryPage', this.$store.state.Library.page + 1)
        getServer(this, 'all', this.menu)
      }
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 91px;
  width: 750px;
}
</style>
