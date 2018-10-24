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
          @wxcCellClicked="wxcCellClicked"
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
    wxcCellClicked (mdc) {
      this.$store.commit('SET_isBottomShow', true)
      this.info = mdc
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
        const lastPages = this.$store.state.Home.lastPages
        const lastPage = lastPages[lastPages.length - 1]
        this.$store.commit('SET_lastPages', [lastPage, 'filter'])
        this.$store.commit('SET_menu', [i, lastPage])
        // this.$store.commit('SET_wt4Page', page + 1)
        // getServer(this, 'all', this.$store.state.Edit.editMenu)
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
