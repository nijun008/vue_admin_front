<template>
	<div class="wrap login-wrap">
    <div class="content login">
      <el-row>
        <el-col :span="15" class="login_bg">
          <h3>2毫升唾液</h3>
          <h3>即将开启您生命的密码</h3>
        </el-col>
        <el-col :span="9" class="form-box">
          <h3 class="login-title">注册</h3>
          <el-form 
            :model="loginForm"
            label-width="94px"
            :rules="loginFormRules"
            ref="loginForm">
            <el-form-item label="手机号码" prop="mobile">
              <el-input placeholder="请输入内容" class="input-with-select" v-model="loginForm.mobile">
                <el-select 
                  v-model="loginForm.countryCode" 
                  slot="prepend" 
                  placeholder="区号" 
                  style="width:60px;">
                  <el-option label="+86" value="+86"></el-option>
                  <el-option label="+12" value="+12"></el-option>
                  <el-option label="010" value="010"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-col :span="16">
                <el-input v-model="loginForm.code"></el-input>
              </el-col>
              <el-col :span="7" :offset="1" class="img-code-box">
                <img v-if="captcha.base64str" :src="captcha.base64str">
              </el-col>
            </el-form-item>
            <el-form-item label="短信验证码" prop="smsCode">
              <el-col :span="16">
                <el-input v-model="loginForm.smsCode"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-button class="full-btn" @click="sendSms()">发送验证码</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="推荐码" class="min-bottom">
              <el-input></el-input>
            </el-form-item>
            <el-form-item prop="agree" class="min-bottom">
              <el-checkbox name="type" :checked="loginForm.agree"></el-checkbox>
              我已阅读并同意<router-link :to="'/'">《法律声明》</router-link>
            </el-form-item>
            <el-form-item class="min-bottom">
              <el-button class="full-btn" @click="submitRegister('loginForm')">注&#12288;册</el-button>
            </el-form-item>
            <el-form-item>
              已有账号？<router-link :to="'/login'">立即登陆</router-link>
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
      captcha: {
        base64str: '',
      },
      loginForm: {
        mobile: '',
        countryCode: '+86',
        password: '',
        code: '',
        smsCode: '',
        agree: false,
        verificationId: '',
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' },
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
        ],
      },
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    submitRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    },
    getCaptcha () {
      this.$api.getCaptcha()
      .then (res => {
        if (res.data.code === 'SUCCESS') {
          this.captcha = res.data
        } else {
          this.$message.error('获取图形验证码出错：' + res.data.message)
        }
      })
    },
    sendSms () {
      if (this.loginForm.mobile && this.loginForm.code) {
        this.$api.sendSms(this.loginForm)
        .then(res => {
          console.log(res.data)
        })
      } else {
        this.$message.error ('请输入手机号和验证码')
      }
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
  height: 520px;
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
  height: 520px;
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
  line-height: 80px;
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
  top: 40px;
}
.login-title:after{
  content: '';
  display: block;
  position: absolute;
  width: 110px;
  height: 1px;
  background-color: #d4d4d4;
  right: 0;
  top: 40px;
}
.min-bottom{
  margin-bottom: 6px;
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
  height: 42px;
  overflow: hidden;
}
.img-code-box img{
  width: 100%;
  height: 42px;
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
.form-box a{
  color: @mainColor;
  &:hover{
    text-decoration: underline;
  }
}
</style>