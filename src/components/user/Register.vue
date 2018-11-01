<template>
  <scroller class="container">
    <div>
      <text class="title">请输入邮箱号</text>
      <input type="email" name="Email" placeholder="请输入邮箱号码" class="input" :autofocus="true" >
    </div>
     <div>
      <text class="title">密码</text>
      <input type="password" name="password" placeholder="请输入密码" class="input" :autofocus="true" />
    </div>
    <div>
      <text class="title">确认密码</text>
      <input type="password" name="password_again" placeholder="请再次输入密码" class="input" :autofocus="true" />
     </div>
    <div>
      <text class="title">手机号码</text>
      <input type="number" name="mobile" placeholder="请输入手机号码" class="input" :autofocus="true" />
    </div>
      <text class="title">推荐码</text>
      <input type="number" name="recommend_number" placeholder="请输入推荐码" class="input" :autofocus="true"/>
      <text class="hint">*专家用户、机构用户需输入推荐码</text>
    </div>
    <div class="row">
      <wxc-button text="注册"
                  type="red"
                  size="medium"
        @wxcButtonClicked='submit'></wxc-button>
      <wxc-button text="重置"
                  type="blue"
                  size="medium"
        @wxcButtonClicked='reset'></wxc-button>
    </div>
  </scroller>
</template>
<script>
import { WxcButton } from 'weex-ui'
export default {
  components: { WxcButton },
  methods: {
    wxcButtonClicked (e) {
      console.log(e)
    },
    submit () {
    },
    reset () {
    }
  }
}
</script>
<style scoped>
.container {
  width: 750px;
  margin-top: 91px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.input {
  font-size: 30px;
  height: 50px;
  width: 740px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 40px;
}
.title{
  font-size:35px;
}
.wxc-grid-select{
  font-size: 20px;
  height: 50px;
  width: 50px;
}
.hint
{
  color:red;
  font-size:25px;

}
.row {
  width: 750px;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 10px;
}
</style>
