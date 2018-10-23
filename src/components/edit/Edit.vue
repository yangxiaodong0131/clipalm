<template>
  <div class="demo">
    <text class="demo-title">{{wxcCellTitle}}</text>
    <div class="demo" @swipe="swipe">
      <wxc-cell v-for="wt4 in wt4Case"
                v-bind:key="wt4.id"
                :label="wt4.drg"
                @wxcCellClicked="wxcCellClicked(wt4)"
                :has-margin="false"
                :extraContent="wt4.extraContent"></wxc-cell>
    </div>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading } from 'weex-ui'
import { getServer } from '../../utils/server'
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
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e)
      this.$store.commit('SET_isInfoButtonShow', false)
      const button = ''
      const gridList = []
      const details = [
        {'label': '入组DRG', 'title': 'drg'},
        {'label': '病案ID', 'title': 'b_wt4_v1_id'},
        {'label': '主要诊断编码', 'title': 'disease_code'},
        {'label': '主要诊断名称', 'title': 'disease_name'},
        {'label': '其他诊断', 'title': 'diags_code'},
        {'label': '手术/操作', 'title': 'opers_code'},
        {'label': '住院天数', 'title': 'acctual_days'},
        {'label': '住院总费用', 'title': 'total_expense'},
        {'label': '性别', 'title': 'gender'},
        {'label': '年龄', 'title': 'age'},
        {'label': '新生儿天数', 'title': 'sf0100'},
        {'label': '新生儿体重', 'title': 'sf0102'},
        {'label': '呼吸机使用时间', 'title': 'sf0104'},
        {'label': '出院转归', 'title': 'sf0108'},
        {'label': '分组日志', 'title': 'log'}]
      this.$store.commit('SET_buttonText', button)
      this.$store.commit('SET_gridList', gridList)
      this.$store.commit('SET_details', details)
    },
    swipe (e) {
      const page = this.$store.state.Edit.wt4Page
      if (e.direction === 'up') {
        this.$store.commit('SET_wt4Page', page + 1)
        getServer(this, 'all', this.$store.state.Edit.editMenu)
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
