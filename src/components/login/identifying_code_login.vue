<template>
	<div class="forgetPassword_warp" style="margin-bottom: 100px;">
		<div class="forgetPassword">
			<h3>验证码登录</h3>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
				<el-form-item prop="phoneunmber">
					<i class="login-icon register-icon-name"></i>
					<el-input v-model="ruleForm.phoneunmber" auto-complete="off" placeholder="手机号码"></el-input>
				</el-form-item>
				<div class="imgCode" style="margin-bottom: 12px;">
					<img :src='ruleForm.imgCodeSrc' />
					<button type="button" class="el-button el-button--default changeimg" @click="getCaptcha()">换一个</button>
				</div>
				<el-form-item prop="imgNumber">
					<i class="login-icon register-icon-code"></i>
					<el-input placeholder="请输入图形验证码" v-model="ruleForm.imgNumber" @keyup.enter.native="submitForm('ruleForm')"></el-input>

				</el-form-item>
				<el-form-item prop="registerCode">
					<i class="login-icon register-icon-code"></i>
					<el-input type="password" placeholder="请输入短信验证码" auto-complete="off" v-model="ruleForm.registerCode" @keyup.enter.native="submitForm('ruleForm')"></el-input>

				</el-form-item>
				<el-form-item>
					<el-button @click="sendCode()" :disabled="t != 120">{{ time }}</el-button>
				</el-form-item>
				<div class="login-btn">
					<el-button class="btn-login" type="danger" @click="submitForm('ruleForm')">确定</el-button>
					<!--  <button class="btn-login" @click="submitForm('ruleForm')">确定</button>-->
				</div>

			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				t: 120,
				time: '发送验证码',
				ruleForm: {
					phoneunmber: '',
					registerCode: '',
					imgNumber: '',
					imgCodeSrc: '',
					imgCode: '',
					smsNumber: ''

				},
				rules: {
					phoneunmber: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}],
					registerCode: [{
						required: true,
						message: '请输入短信验证码',
						trigger: 'blur'
					}],
					imgNumber: [{
						required: true,
						message: '请输入图形验证码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				const self = this;
				self.$refs[formName].validate((valid) => {
					if(valid) {
						const LoginBySMS = {
							smsCode: this.ruleForm.registerCode,
							verificationId: this.ruleForm.smsNumber,
							countryCode: '86',
							mobile: this.ruleForm.phoneunmber
						}
						this.$api.pubLoginBySMS(LoginBySMS).then(res => {
							if(res.data.code != 'SUCCESS') {
								this.$message.error(res.data.message);
							} else if(res.data.code == 'SUCCESS') {
								this.$message.success("登录成功");
								this.$store.state.token = res.data.accessToken;
								this.$store.state.logOut = true
								this.$store.commit('login', this.$store.state.token)
								this.$router.push('/accountinfo');
								console.log(res)
							} else {
								console.log(res)
							}

						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			_logIn() {
				if(localStorage.getItem('token') != '') {
					localStorage.clear('token')
					this.$store.state.logOut = false
				}
			},
			//获取图形验证码
			getCaptcha() {
				this.$api.pubLoginCaptcha().then(res => {
					this.ruleForm.imgCodeSrc = res.data.base64str
					this.ruleForm.imgCode = res.data.verificationId

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
							verificationId: this.ruleForm.imgCode,
							countryCode: '86',
							mobile: this.ruleForm.phoneunmber
						}

						this.$api.PubLoginSMS(sendCodeArry).then(res => {
							if(res.data.code != 'SUCCESS') {
								this.$message.error(res.data.message);
								this.getCaptcha();
								this.time = '发送验证码';
							} else {
								this.$message.success('验证码发送成功，请注意查收');
								this.ruleForm.smsNumber = res.data.verificationId;
								var timmer = window.setInterval(() => {
									this.time = this.t + 's...';
									this.t--;
									if(this.t == 0) {
										clearInterval(timmer);
										this.time = '发送验证码';
										this.t = 120;
									}
								}, 1000)
							}

						})
					}
				});

			}
		},
		mounted() {
			this._logIn();
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