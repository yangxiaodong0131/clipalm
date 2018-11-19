<template>
  <scroller v-bind:style="scroller">
    <div class="panel" v-bind:style="panel">
      <div v-if="activeTab === 1">
        <wxc-rich-text :config-list='caseConfigTitle'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <div class="type-container">
          <wxc-rich-text class="special-rich"
                         :config-list="configString"></wxc-rich-text>
        </div>
        <wxc-rich-text :config-list='configHeader1'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent1"></wxc-special-rich-text>
        <wxc-rich-text :config-list='configHeader2'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent2"></wxc-special-rich-text>
        <wxc-rich-text :config-list='configHeader3'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent3"></wxc-special-rich-text>
        <wxc-rich-text :config-list='configHeader4'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent4"></wxc-special-rich-text>
        <wxc-rich-text :config-list='configHeader5'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-rich-text :config-list='configHeader6'
                    :has-text-margin="true"
                    class="rich"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent6"></wxc-special-rich-text>
        <wxc-rich-text :config-list='configHeader7'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent7"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent8"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent9"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent10"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent11"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent12"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent13"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent14"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent15"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent16"></wxc-special-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent17"></wxc-special-rich-text>
        <wxc-rich-text :config-list='configHeader18'
                    :has-text-margin="true"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-rich-text :config-list='configHeader19'
                    :has-text-margin="true"
                    class="rich"
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
        <wxc-special-rich-text class="special-rich"
                                 :config-list="configContent19"></wxc-special-rich-text>
      </div>
      <div v-if="activeTab === 2">
        <text class="text">
        字典说明
        提供现阶段临床上使用的所有疾病编码，肿瘤编码，DRG编码，病理编码等等，并提供编码的历史修订记录，可切换各版本。
        DRG字典
        提供MDC、ADRG、DRG，北京版本、国标版本，供用户查询。
        ICD字典
        提供ICD9手术编码、ICD10疾病编码的北京版本、国标版本供用户查询。
        其他编码查询
        卫统4字段查询，病理码查询等等。
        </text>
      </div>
      <div v-if="activeTab === 3">
        <text class="text">
        DRG分析
        运用DRG对病历进行分组，从而进行分析。对不同的用户提供定制不同的分析文案。可以将数据进行同期对比，环比等等，各不同机构同样提供对比。
        3.1 专家用户
        对各DRG算出其CV、CMI等数值，供专家修改DRG提出参考。
        3.2 机构用户
        利用DRG对机构的科室、个人进行绩效上的考核。
        3.3 医保用户
        借助DRG，对医保核算进行把控。
        </text>
      </div>
      <div v-if="activeTab === 4">
        <text class="text">
        论坛说明
        </text>
      </div>
    </div>
  </scroller>
</template>

<script>
import { WxcRichText, WxcSpecialRichText } from 'weex-ui'

export default {
  components: { WxcRichText, WxcSpecialRichText },
  data () {
    return {
      caseConfigTitle: [{
        type: 'text',
        value: '病案说明',
        theme: 'yellow',
        style: {
          fontSize: 36
        }
      }],
      configString: '病案模块主要分为入组异常病案查询及分析，单条分组，自定义病案查询，三个模块。',
      configHeader1: [{
        type: 'tag',
        value: '1.入组异常病案查询',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent1: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '入组异常病案查询主要针对以下三个方面对未入组病历进行归类，并对其异常点进行分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configHeader2: [{
        type: 'tag',
        value: '1.1 未入组病案(0000组)',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent2: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '未入组病案是指对主诊填写错误，导致分组异常分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configHeader3: [{
        type: 'tag',
        value: '1.2 费用异常病案',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent3: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '是对影响高CV的费用以及住院日的病案，以及住院天数大于60天、住院费用小于4元（9999组）进行归类，并对其进行分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configHeader4: [{
        type: 'tag',
        value: '1.3 质量异常病案',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent4: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '质量异常是对低风险死亡病历，7日内再入院病历，再手术等涉及到质量相关的病案归类。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configHeader5: [{
        type: 'tag',
        value: '2.单条分组',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configHeader6: [{
        type: 'tag',
        value: '2.1 单条分组说明',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent6: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '录入分组所需的字段，按照分组字段说明填写好分组信息，点击单条分组进行调用分组器，即可展示分组结果。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configHeader7: [{
        type: 'tag',
        value: '2.2 分组病历字段说明',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent7: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '1、主要诊断（DISEASE_CODE），必填，空缺入0000组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent8: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '2、年龄（AGE），必填，空缺影响drg入组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent9: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '3、性别（GENDER），必填，空缺影响MS1、MT1、NS1、NT1的入组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent10: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '4、新生儿出生天数（SF0100），新生儿必填，空缺不能入MDCP',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent11: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '5、新生儿出生体重（SF0102），新生儿必填，空缺影响MDCP分组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent12: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '6、呼吸机使用时间（SF0104） 选填',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent13: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '7、出院转归（SF0108），必填，空缺影响drg入组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent14: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '8、住院日（ACCTUAL_DAYS），必填，空缺影响drg入组，大于60天入9999组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent15: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '9、住院费用(TOTAL_EXPENSE)，必填，空缺影响drg权重计算，小于4元入9999组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent16: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '10、其他诊断(diags_code)，选填',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configContent17: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '11、手术/操作(opers_code)，选填',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      configHeader18: [{
        type: 'tag',
        value: '3、自定义病案查询',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configHeader19: [{
        type: 'tag',
        value: '3.1 自定义病案查询说明',
        theme: 'yellow',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      configContent19: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '选择筛选的查询条件，对病案进行自定义查询，如果未选择筛选条件，则查询的是全部病案。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }]
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight + 1
      const style = {
        height: tabPageHeight
      }
      return style
    },
    scroller () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight,
        width: '750px'
      }
      return style
    }
  },
  methods: {
    wxcRichTextLinkClick () {}
  }
}
</script>
<style scoped>
  .text {
    font-size: 35px;
  }
  .panel {
    flex-direction: column;
    align-items: center;
    margin: 10px;
    /* justify-content: center; */
  }
  .special-rich {
    margin: 15px;
  }
  .rich {
    margin-top: 10px;
  }
</style>
