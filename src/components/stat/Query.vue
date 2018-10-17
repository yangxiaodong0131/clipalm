<!-- <template>
  <div class="wrapper">
    <text v-for="(stat, i) in stats" v-bind:key="i">{{stat.code}}</text>
  </div>
</template> -->
<template>
  <div class="container">
    <!-- :hot-list-config="hotListConfig" -->
    <!-- :city-location-config="cityLocationConfig" -->
    <wxc-indexlist :normal-list="stats"
                   @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                   :show-index="showIndex"></wxc-indexlist>
  </div>
</template>

<script>
import { WxcIndexlist } from 'weex-ui'
export default {
  components: { WxcIndexlist },
  created: function () {
  },
  computed: {
    stats: {
      get () {
        return this.$store.state.Stat.statDrg
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    },
    wxcIndexlistItemClicked (e) {
      console.log(e)
    },
    test () {
      // console.log(dataList)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    /* flex-direction: column; */
    justify-content: center;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
</style>
