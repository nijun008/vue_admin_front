<template>
  <div class="forgetPassword_warp" style="margin-bottom: 150px;">
    <div class="forgetPassword">
      <h3>重置密码</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" v-if='resetPass'>

        <el-form-item prop="password">
          <i class="login-icon register-icon-code"></i>
          <el-input type="password" placeholder="请设置您的新登陆密码" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password2">
        <i class="login-icon register-icon-code"></i>
          <el-input type="password" placeholder="请确认您的新登陆密码" v-model="ruleForm.password2" auto-complete="off"></el-input>
        </el-form-item>
        
          <el-button class="btn-login" type="danger" @click="submitForm('ruleForm')">确定</el-button>
          <!--  <button class="btn-login" @click="submitForm('ruleForm')">确定</button>-->
        
      </el-form>
    
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resetPass:true,
      sendCodeText: '发送短信',
      t: 120,
      ruleForm: {
        password:'',
        password2:''
      },
      rules: {
        phoneunmber: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }],
        registerCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        imgNumber: [{
          required: true,
          message: '请输入图形验证码',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入您的新登陆密码',
          trigger: 'blur'
        }],
        password2: [{
            required: true,
            message: '请确认您的新登陆密码',
            trigger: 'blur'

          },
          {
            validator: this.validatePass2,
            trigger: 'blur'
          }
        ],
        
      },
      forgetPasswordList:{
        smsNumber:''
      },
      imgCodeList:{
        imgCodeSrc:'',
        imgCode:''
      },
    }
  },
  methods: {
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if(valid) {
          const pubForgetPass={
            smsCode:this.ruleForm.registerCode,
            verificationId:this.forgetPasswordList.smsNumber,
            countryCode:'86',
            mobile:this.ruleForm.phoneunmber,
            password:this.ruleForm.password
          }
          this.$api.pubForgetPassword(pubForgetPass).then(res => {
            console.log(pubForgetPass);
            if(res.data.code != 'SUCCESS') {
              this.$message.error(res.data.message);
              this.getCaptcha();
            } else {
              this.$message.success('登陆密码重置成功，请进行登陆！');
              this.$router.push('/accountinfo');
                      }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    validatePass2(rule, value, callback) {
      if(value === '') {
        callback(new Error('请再次输入密码'));
      } else if(value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    //获取图形验证码
    getCaptcha() {
      this.$api.pubCaptcha().then(res => {
        console.log(res);
        this.imgCodeList.imgCodeSrc = res.data.base64str
        this.imgCodeList.imgCode = res.data.verificationId
        //alert(this.imgCodeList.imgCode)

      })
    },
    //获取短信验证码
    sendCode() {
      this.$refs.ruleForm.validateField('phoneunmber');
      this.$refs.ruleForm.validateField('imgNumber', (error) => {
        console.log(error);
        if(error != '') {
          return false;
        } else {

          const sendCodeArry = {
            code: this.ruleForm.imgNumber,
            verificationId: this.imgCodeList.imgCode,
            countryCode: '86',
            mobile: this.ruleForm.phoneunmber
          }
                      this.time = '发送中···';
          this.$api.pubForgetPasswordSMS(sendCodeArry).then(res => {
            if(res.data.code != 'SUCCESS') {
              this.$message.error(res.data.message);
              this.getCaptcha();
              this.sendCodeText = '发送验证码';
            } else {
              this.$message.success('验证码发送成功，请注意查收');
              this.forgetPasswordList.smsNumber = res.data.verificationId;
              var timmer = window.setInterval(() => {
                this.sendCodeText = this.t + 's...';
                this.t--;
                if(this.t == 0) {
                  clearInterval(timmer);
                  this.sendCodeText = '发送验证码';
                  this.t = 120;
                }
              }, 1000)
            }

          })
        }
      });

    },
  },
  
  mounted() {
    this.getCaptcha();
  }
}
</script>

<style>
  .btn-login {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #E60012;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
  }
  
  .btn-login span {
    position: relative;
    top: -10px;
  }
  
  .forgetPassword_warp {
    /*width: 1120px;
    margin: auto;*/
    background: #fff;
    min-height: 450px;
    margin-top: 30px;
    padding-top: 50px;
  }
  
  .demo-ruleForm input {
    padding-left: 36px;
    height: 56px;
    line-height: 56px;
  }
  
  .forgetPassword {
    width: 350px;
    margin: auto;
  }
  
  .forgetPassword h3 {
    text-align: center;
    font-size: 20px;
    line-height: 60px;
    font-weight: normal;
    text-align: center;
  }
  
  .register-icon-code {
    background-image: url(../../../static/img/register-code.png);
    background-position: 10px 6px;
  }
  
  .register-icon-name {
    background-image: url(../../../static/img/register-name.png);
    background-position: 10px 6px;
  }
</style>