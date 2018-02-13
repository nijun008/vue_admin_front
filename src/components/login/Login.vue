<template>
  <div class="wrap login-wrap">
    <div class="content login">
      <el-row>
        <el-col :span="15" class="login_bg">
          <h3>2毫升唾液</h3>
          <h3>即将开启您生命的密码</h3>
        </el-col>
        <el-col :span="9" class="form-box">
          <h3 class="login-title">登陆</h3>
          <el-form 
            :model="loginForm"
            label-width="88px"
            :rules="loginFormRules"
            ref="loginForm">
            <el-form-item label="手机号码" prop="mobile">
              <el-input placeholder="请输入用户名" class="input-with-select" v-model="loginForm.mobile">
                <!-- <el-select 
                  v-model="loginForm.quhao" 
                  slot="prepend" 
                  placeholder="区号" 
                  style="width:60px;">
                  <el-option label="+86" value="+86"></el-option>
                  <el-option label="+12" value="+12"></el-option>
                  <el-option label="010" value="010"></el-option>
                </el-select> -->
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password"  v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="agree" class="min-bottom">
              <router-link :to="'/forget_password'">忘记密码？</router-link>
            </el-form-item>
            <el-form-item class="min-bottom">
              <el-button class="full-btn" @click="submitLogin('loginForm')">登&#8195;陆</el-button>
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
      loginForm: {
        mobile: '',
        password: '',
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入登录手机', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submitLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginForm.account =  '+86.' + this.loginForm.mobile
          this.$api.login(this.loginForm)
          .then(res => {
            if (res.data.code === 'SUCCESS') {
              console.log(res.data)
              this.$message.success("登录成功");  
              this.$store.state.token = res.data.accessToken;
              this.$store.state.loginState = true
              this.$store.state.mobile = this.loginForm.mobile
              this.$store.commit('login', this.$store.state.token)
              localStorage.setItem('mobile', this.loginForm.mobile);
              this.$router.push('/user')
            } else {
              this.$message.error('登陆出错：' + res.data.message)
            }
          })
        } else {
          return false;
        }
      });
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