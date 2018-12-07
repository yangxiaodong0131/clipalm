<template>
  <div :class="gridClass">
    <flex
      v-for="(row, rowIndex) in rowArr"
      :key="rowIndex"
      :gutter="0"
      class="grid-row"
    >
      <div
        v-for="(item, index) in row"
        :key="index"
        :class="getItemClass(item)"
        :style="_itemStyle"
        @click="handleClick($event, item)"
      >
        <template v-if="item">
          <image
            class="grid-icon"
            :style="_iconStyle"
            :src="item.icon"
          />
          <text v-if="item.text" class="grid-text">{{item.text}}</text>
        </template>
      </div>
    </flex>
  </div>
</template>

<script>
import Flex from '../flex'
import FlexItem from '../flex-item'
export default {
  name: 'grid',
  components: {
    Flex,
    FlexItem
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    columnNum: {
      type: Number,
      default: 4
    },
    hasLine: {
      type: Boolean,
      default: true
    },
    itemStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    iconStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    rowArr () {
      const rowArr = []
      let rowCount
      this.data.forEach((item, index) => {
        rowCount = Math.floor(index / this.columnNum)
        if (!rowArr[rowCount]) {
          rowArr[rowCount] = []
        }
        rowArr[rowCount].push(item)
      })
      while (rowArr[rowCount].length !== this.columnNum) {
        rowArr[rowCount].push(false)
      }
      return rowArr
    },
    gridClass () {
      return this.makeClassList({
        'grid': true,
        'grid-line': this.hasLine
      })
    },
    itemClass () {
      return this.makeClassList({
        'grid-item': true,
        'grid-item-line': this.hasLine
      })
    },
    itemWidth () {
      return 750 / this.columnNum
    },
    _itemStyle () {
      return {
        height: `${this.itemWidth}px`,
        ...this.itemStyle
      }
    },
    _iconStyle () {
      let width = `${this.itemWidth * 0.28}px`
      return {
        width: width,
        height: width,
        ...this.iconStyle
      }
    }
  },
  methods: {
    handleClick ($event, item) {
      if (item) {
        this.$emit('click', item, this.data.indexOf(item))
      }
    },
    makeClassList (classList) {
      // web 支持
      if (weex.config.env.platform === 'Web' || Array.isArray(classList)) {
        return classList
      } else {
        return Object.keys(classList).filter(classname => classList[classname])
      }
      // return classList
    },
    getItemClass (item) {
      return this.makeClassList({
        'grid-item': true,
        'grid-item-line': this.hasLine,
        'grid-item-tap': !!item
      })
    }
  }
}
</script>

<style scoped lang="less">
.grid {
  &-line {
    border-color: #ddd;
    border-bottom-width: 1PX;
    border-left-width: 1PX;
  }
  &-item {
    flex: 1;
    justify-content: center;
    align-items: center;
    &-line {
      border-right-width: 1PX;
      border-top-width: 1PX;
      border-color: #ddd;
    }
    &-tap:active {
      background-color: #ddd;
    }
  }
  &-icon {
    margin-top: 9 * 2px;
  }
  &-text {
    margin-top: 9 * 2px;
    font-size: 12 * 2px;
    color: #000;
  }
}
</style>
