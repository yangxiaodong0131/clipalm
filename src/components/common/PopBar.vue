<template>
  <wxc-popup popup-color="#FFFFFF"
            :show="visible"
            @wxcPopupOverlayClicked="popupOverlayBottomClick"
            pos="bottom"
            :height="height"
            width="540">
    <div class="demo-content">
    <wxc-cell v-for="(menu, index) in menus" :key="index"
        :label="menu"
        :title="menu"
        :has-arrow="false"
        :has-margin="true"
        @wxcCellClicked="wxcCellClicked(menu)"></wxc-cell>
    </div>
  </wxc-popup>
</template>

<script>
import { WxcPopup, WxcCell, Utils } from 'weex-ui'
import { getServer } from '../../utils/server'

export default {
  components: { WxcPopup, WxcCell },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120
    }
  },
  computed: {
    visible () {
      return this.$store.state.Home.visible
    },
    menus () {
      return this.$store.state.Home.menus
    }
  },
  methods: {
    wxcRichTextLinkClick () {
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_visible', false)
    },
    wxcCellClicked (menu) {
      this.$store.commit('SET_visible', false)
      const i = this.$store.state.Home.activeTab
      if (menu === '自定义查询') {
        this.$store.commit('SET_menu', [i, menu])
      } else if (menu === '未入组病历') {
        this.$store.commit('SET_editMenu', menu)
        getServer(this, 'all', '未入组病历')
      } else if (menu === '低风险死亡病历') {
        this.$store.commit('SET_editMenu', menu)
        getServer(this, 'all', '低风险死亡病历')
      } else if (menu === '高CV病历') {
        this.$store.commit('SET_editMenu', menu)
        getServer(this, 'all', '高CV病历')
      } else if (menu === 'QY病历') {
        this.$store.commit('SET_editMenu', menu)
        getServer(this, 'all', 'QY病历')
      } else {
        this.$store.commit('SET_library_menu', menu)
        this.$store.commit('SET_menu', [i, '数据展示'])
      }
      // if (i === 1) {
      //   getServer(this, 'wt4', '病案查询')
      // } else {
      //   getServer(this, 'all', menu)
      // }
    }
  }
}
</script>
