<template>
	<div class="wrap login-wrap">
    <div class="content login">
      <el-row>
        <el-col :span="15" class="login_bg">
          <h3>2毫升唾液</h3>
          <h3>即将开启您生命的密码</h3>
        </el-col>

        <el-col :span="9" class="form-box" v-show="step === 1">
          <h3 class="login-title">找回密码</h3>
          <el-form 
            :model="loginForm"
            label-width="88px">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input placeholder="请输入内容" class="input-with-select" v-model="loginForm.phoneNumber">
                <el-select 
                  v-model="loginForm.quhao" 
                  slot="prepend" 
                  placeholder="区号" 
                  style="width:60px;">
                  <el-option label="+86" value="+86"></el-option>
                  <el-option label="+12" value="+12"></el-option>
                  <el-option label="010" value="010"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="imgCode">
              <el-col :span="16">
                <el-input v-model="loginForm.imgCode"></el-input>
              </el-col>
              <el-col :span="7" :offset="1" class="img-code-box">
                验证码
              </el-col>
            </el-form-item>
            <el-form-item label="短信验证码" prop="messageCode">
              <el-col :span="16">
                <el-input v-model="loginForm.messageCode"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-button class="full-btn">发送验证码</el-button>
              </el-col>
            </el-form-item>
            <el-form-item class="min-bottom">
              <el-button class="full-btn" @click="step = 2">下一步</el-button>
            </el-form-item>
            <el-form-item>
              还没有账号？<router-link :to="'/register'">立即注册</router-link>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="9" class="form-box" v-show="step === 2">
          <h3 class="login-title">重置密码</h3>
          <el-form 
            :model="loginForm"
            label-width="88px">
            <el-form-item label="设置新密码" prop="phoneNumber">
              <el-input 
              	type="password" 
              	placeholder="请输入新密码" 
              	v-model="loginForm.password">
              </el-input>
            </el-form-item>
            <el-form-item label="验证新密码" prop="imgCode">
              <el-input 
              	type="password" 
              	placeholder="请再次输入新密码" 
              	v-model="loginForm.passwordAgin">
              </el-input>
            </el-form-item>
            <el-form-item class="min-bottom">
              <el-button class="full-btn">确&#12288;定</el-button>
            </el-form-item>
            <el-form-item>
              还没有账号？<router-link :to="'/register'">立即注册</router-link>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
    	step: 1,
      loginForm: {
        phoneNumber: '126234',
        quhao: '123',
        password: '1223',
        imgCode: '1254',
        messageCode: '1234',
        agree: true,
        passwordAgin: '',
      },
    }
  }
}
</script>

<style lang="less">
@import url(../../../static/css/global.less);
.login-wrap {
  background-color: #f5f5f5;
  padding: 84px 0;
}
.login_bg {
  height: 494px;
  background-image: url("@{static}/img/bg_login.jpg");
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 36px;
  padding-top: 120px;
  padding-left: 56px;
}
.login_bg h3 {
  margin-bottom: 20px;
}
.form-box{
  background-color: #fff;
  height: 494px;
}
.form-box{
  padding: 0 20px;
}
.full-btn{
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
}
.login-title{
  font-size: 30px;
  line-height: 90px;
  text-align: center;
  position: relative;
}
.login-title:before{
  content: '';
  display: block;
  position: absolute;
  width: 110px;
  height: 1px;
  background-color: #d4d4d4;
  left: 0;
  top: 45px;
}
.login-title:after{
  content: '';
  display: block;
  position: absolute;
  width: 110px;
  height: 1px;
  background-color: #d4d4d4;
  right: 0;
  top: 45px;
}
.min-bottom{
  margin-bottom: 6px;
}
.el-popper[x-placement^=bottom] .popper__arrow{
  left: 105% !important;
}
.el-popper[x-placement^=bottom] .popper__arrow{
  left: 110% !important;
}
.el-input--suffix .el-input__inner{
  padding-right: 20px;
  padding-left: 10px;
}
.el-input__suffix{
  right: 0;
}
.img-code-box{
  border: 1px solid #d8dce5;
  border-radius: 4px;
  text-align: center;
}
.form-box button{
  background-color: @mainColor;
  color: #fff;
  &:hover {
    background-color: spin(@mainColor, 10);
    border: none;
    color: #fff;
  }
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: @mainColor;
  border-color: @mainColor;
}
.form-box a{
  color: @mainColor;
  &:hover{
    text-decoration: underline;
  }
}
</style>