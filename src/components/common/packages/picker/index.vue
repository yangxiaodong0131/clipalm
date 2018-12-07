<template>
  <div class="picker">
    <wxc-popup
      :show="true"
      pos="bottom"
      :height="popupHeight">
      <wxc-minibar background-color="#FFFFFF"
                   @wxcMinibarLeftButtonClicked="handleHeaderClick('dismiss')"
                   @wxcMinibarRightButtonClicked="handleHeaderClick('ok')">
        <text style="font-size: 38px;color:#3095e9" slot="left">{{dismissText}}</text>
        <text style="font-size: 40px;" slot="middle">{{placeholder}}</text>
        <text style="font-size: 38px;color:#3095e9" slot="right">{{okText}}</text>
      </wxc-minibar>
      <picker-view
        :data="data"
        :value="currentValue"
        @change="handlePickerChange"
        ref="pickerView"
      ></picker-view>
    </wxc-popup>
    <slot :extra="extra" :show="() => {currentShow = true}"></slot>
  </div>
</template>

<script>
import { WxcPopup, WxcMinibar, WxcCell } from 'weex-ui'
import PickerView from '../picker-view/index.vue'
import Utils from '../utils'
export default {
  name: 'picker',
  mixins: [WxcCell],
  components: { WxcPopup, WxcMinibar, PickerView },
  model: {
    prop: 'value',
    event: 'ok'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array, // Array<Array<{value, label, children: Array}>>
      default: () => []
    },
    value: {
      type: Array,
      default: null
    },
    okText: {
      type: String,
      default: '确定'
    },
    dismissText: {
      type: String,
      default: '取消'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    format: {
      type: [Function, String],
      default: (lables) => lables.join(',')
    }
  },
  data () {
    return {
      currentShow: this.show,
      currentValue: this.value || [],
      selected: null,
      isIPhoneX: false
    }
  },
  computed: {
    lables () {
      return this.selected ? this.selected.map(item => item.label) : []
    },
    extra () {
      return this.format(this.lables) || this.placeholder
    },
    popupHeight () {
      // (false ? 78 : 0)
      return 562
    }
  },
  methods: {
    initData () {
      if (this.currentValue) {
        const isCascade = this.data[0] && Utils.isPlainObject(this.data[0])
        this.selected = []
        this.currentValue.some((value, index) => {
          let current = isCascade
            ? (index === 0 ? this.data : this.selected[index - 1].children)
            : this.data[index]
          current.some(item => {
            if (item.value === this.currentValue[index]) {
              this.selected[index] = item
              return true
            }
          })
          return !this.selected[index]
        })
      }
    },
    close (type = 'dismiss') {
      this.$emit('hide', type)
      this.currentShow = false
    },
    handleMaskClick () {
      this.close('dismiss')
    },
    handleHeaderClick (type) {
      switch (type) {
        case 'ok':
          this.selected = [...this.$refs.pickerView.selected]
          this.currentValue = [...this.$refs.pickerView.selectedValue]
          this.$emit('ok', this.currentValue, this.lables)
          this.close('ok')
          break
        case 'dismiss':
          this.close('dismiss')
          break
      }
    },
    handlePickerChange () {
      if (('change' in this.$listeners)) {
        this.$emit('change', [...this.$refs.pickerView.selectedValue], this.$refs.pickerView.selected.map(item => item.label))
      }
    }
  },
  watch: {
    currentShow (val) {
      if (this.show !== val) {
        this.$emit('update:show', val)
      }
    },
    show (val) {
      if (this.currentShow !== val) {
        this.currentShow = val
      }
    },
    value (val) {
      if (val.join() !== this.currentValue.join()) {
        this.currentValue = val
        this.initData()
      }
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped lang="less">
@import '../less/variable.less';
.picker {
  &-header {
    height: @picker-header-height;
    border-color: @border-color-base;
    border-bottom-width: @border-width-sm;
  }
}
</style>
