<template>
	<div class="wallet">
		<el-tabs v-model="activeName">
			<el-tab-pane label="我的钱包" name="first">
				<!--未认证情况-->
				<div class="beforeAuthentication" v-if='identityAuthentication'>
					请进行投资人认证
					<!--<router-link to="identification">去认证</router-link>-->
				</div>
				<!--未认证情况结束-->

				<!--已认证未绑定银行卡情况-->
				<!--<div class="beforeAuthentication">
					请进行银行卡绑定
					 <router-link to="bindBBankCard">去绑定</router-link>
				</div>-->
				<!--已认证未绑定银行卡情况-->
				<!-- 银行卡绑定 -->
				<div class="identification" style="margin-bottom: 30px;" v-else-if='identityAuthenticationTwo'>
					<div class="commitSuccess" v-show='authentication'><img src="../../../static/img/gou.png">您的银行卡资料已提交，请耐心等待审核！</div>
						<div class="commitSuccess" v-show='rejectedState'><img src="../../../static/img/notice.png">您的银行卡资料由于{{rejected}}，已被驳回，请修改后重新上传！</div>
					<div class="identification_main" v-loading="loading">
						
						<h6>绑定银行卡</h6>

						<p class="identification_tips">注意：为了您的安全，您投资所用银行卡信息需和实名认证信息保持一致</p>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
							<el-form-item prop="cardName">
								<el-input v-model="ruleForm.cardName" placeholder="请输入持卡人姓名"></el-input>
							</el-form-item>
							<el-form-item prop="cardNumber">
								<el-input placeholder="请输入银行卡号" v-model="ruleForm.cardNumber" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<el-form-item prop="bankName">
								<el-input placeholder="请输入所属银行" v-model="ruleForm.bankName" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<el-form-item prop="branchName">
								<el-input placeholder="请输入分行名称" v-model="ruleForm.branchName" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<el-form-item prop="branchAddress">
								<el-input placeholder="请输入分行地址" v-model="ruleForm.branchAddress" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<p class="red">上传银行卡正反面</p>
							<div class="card-img">
								<div class="card-img-l">
									<p>正面</p>
									<div class="avatar-uploader">
										<img v-if="bankAccountCardImgList[0].base64Str" :src="bankAccountCardImgList[0].base64Str" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										<input type="file" class="file" id="bankImg1" @change="commitBankImg('bankImg1',0)" />
									</div>
								</div>
								<div class="card-img-r">
									<p>反面</p>
									<div class="avatar-uploader">
										<img v-if="bankAccountCardImgList[1].base64Str" :src="bankAccountCardImgList[1].base64Str" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										<input type="file" class="file" id="bankImg2" @change="commitBankImg('bankImg2',1)" />
									</div>
								</div>

							</div>
							<div class="">
								<el-button class="" type="danger" @click="submitForm('ruleForm')" style="margin: auto;display: block;margin-top: 20px;">{{btnBankCard}}</el-button>
								<!--  <button class="btn-login" @click="submitForm('ruleForm')">确定</button>-->
							</div>

						</el-form>
					</div>
				</div>
				<!-- 银行卡绑定结束 -->
				<!--已认证-->
				<div class="afterAuthentication" v-else>
					<el-row :gutter="20">
						<!--可用余额-->
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<dl class="authent">
									<dt><span>{{accountBanlance}}</span>元</dt>
									<dd>可用余额</dd>
								</dl>
								<div class="wallet-btn">
									<el-button type="danger" @click="recharge">充值</el-button>
								</div>

							</div>
						</el-col>
						<!--冻结中金额-->
						<!--<el-col :span="6">
					  	<div class="grid-content bg-purple">
					  		  <dl class="authent">
					  	      	 <dt><span>0</span>元</dt>
					  	      	 <dd>冻结中金额</dd>
					  	      </dl>
					  	       <div class="wallet-btn">
					  	      	 <el-button>提现</el-button>
					  	      </div>
					  	      
					  	</div>
					  </el-col>-->
						<!--认投成功金额-->
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<dl class="authent">
									<dt><span>{{accountInvest}}</span>元</dt>
									<dd>认投成功金额</dd>
								</dl>
								<div class="wallet-btn" v-show='Unbind'>
									<el-button @click="unbound"  :disabled="!Unbind" >解绑银行卡</el-button>
								</div>

							</div>
						</el-col>
						<!--银行卡信息-->
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<div class="card-message" v-if="Unbind" >
									<p class="bank_name donebank">建设银行</p>
									<p class="bank_num donebank">6217 **** **** 7115</p>

								</div>
								<!--解绑后的-->
								<div class="unbindCard" v-else  @click="bindBankCardDialog = true">
									<p><img src="../../../static/img/add.png"/></p>
									<p class="text">{{bankState}}</p>
								</div>
								<!--解绑后的结束-->
								<!--重新绑定的框-->
								<el-dialog title="绑定银行卡" :visible.sync="bindBankCardDialog" width="200"
									  center>
									 <div class="identification_main" v-loading="loading">
							<div class="commitSuccess" v-show='authentication'><img src="../../../static/img/gou.png">您的银行卡资料已提交，请耐心等待审核！</div>
						<div class="commitSuccess" v-show='rejectedState'><img src="../../../static/img/notice.png">您的银行卡资料由于{{rejected}}，已被驳回，请修改后重新上传！</div>
						<!-- <h6>绑定银行卡</h6> -->

						<p class="identification_tips">注意：为了您的安全，您投资所用银行卡信息需和实名认证信息保持一致</p>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
							<el-form-item prop="cardName">
								<el-input v-model="ruleForm.cardName" placeholder="请输入持卡人姓名"></el-input>
							</el-form-item>
							<el-form-item prop="cardNumber">
								<el-input placeholder="请输入银行卡号" v-model="ruleForm.cardNumber" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<el-form-item prop="bankName">
								<el-input placeholder="请输入所属银行" v-model="ruleForm.bankName" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<el-form-item prop="branchName">
								<el-input placeholder="请输入分行名称" v-model="ruleForm.branchName" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<el-form-item prop="branchAddress">
								<el-input placeholder="请输入分行地址" v-model="ruleForm.branchAddress" @keyup.enter.native="submitForm('ruleForm')"></el-input>
							</el-form-item>
							<p class="red">上传银行卡正反面</p>
							<div class="card-img">
								<div class="card-img-l">
									<p>正面</p>
									<div class="avatar-uploader">
										<img v-if="bankAccountCardImgList[0].base64Str" :src="bankAccountCardImgList[0].base64Str" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										<input type="file" class="file" id="bankImg1" @change="commitBankImg('bankImg1',0)" />
									</div>
								</div>
								<div class="card-img-r">
									<p>反面</p>
									<div class="avatar-uploader">
										<img v-if="bankAccountCardImgList[1].base64Str" :src="bankAccountCardImgList[1].base64Str" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										<input type="file" class="file" id="bankImg2" @change="commitBankImg('bankImg2',1)" />
									</div>
								</div>

							</div>
							<div class="">
								<el-button class="" type="danger" @click="submitForm('ruleForm')" style="margin: auto;display: block;margin-top: 20px;">{{btnBankCard}}</el-button>
								<!--  <button class="btn-login" @click="submitForm('ruleForm')">确定</button>-->
							</div>

						</el-form>
					</div>
									  <span slot="footer" class="dialog-footer">
									    <el-button @click="bindBankCardDialog = false">关闭</el-button>
									    <!--<el-button type="primary" @click="">确 定</el-button>-->
									  </span>
									</el-dialog>
								<!--重新绑定的框结束-->
							</div>
						</el-col>
					</el-row>
					<!-- <div class="pull-left" id="minshengbank">
						本平台由新浪支付
						<img alt="" src="../../../static/img/sinapay-logo.png" /> 提供资金安全技术支持
					</div> -->

					<!--资金明细表格-->
					<div class="fund-details">
						<p style="margin-bottom: 20px;">资金明细</p>
						<!--表格开始-->
						<el-table :data="tableData" stripe style="width: 100%">

							<el-table-column prop="createTime" label="时间" width="180">
							</el-table-column>
							<el-table-column prop="amount" label="交易金额">
							</el-table-column>
							<el-table-column prop="amountAvailable" label="可用余额">
							</el-table-column>
							<el-table-column prop="cheangeType" label="流水类型">
							</el-table-column>
						</el-table>
						<!--分页-->
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="flowRecord.pageSize" layout="prev, pager, next, jumper" :total="totalRows">
						</el-pagination>

						<!--表格结束-->
					</div>
					<!--资金明细表格结束-->
				</div>

				<!--已认证结束-->
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		computed: {
			//用户余额和投资金额
			accountBanlance() {
				return this.$store.state.user.accountBanlance;
			},
			accountInvest() {
				return this.$store.state.user.accountInvest;
			},
			bankAccountState(){
				return this.$store.state.sysUser.bankAccountState;
			}
		},
		data: function() {
			return {
				rejectedState:false,
				rejected:'照片不合格',
				identityAuthentication:true,
				identityAuthenticationTwo:true,
				bankState:'绑定银行卡',
				bindBankCardDialog:false,
				//解绑银行卡
				Unbind:true,
				//银行卡提交按钮
				btnBankCard:'提交',
				loading: false,
				//流水记录总条数
				totalRows: 1,
				fileinput: '',
				imageUrl: '',
				b64: '',
				currentPage: 1,
				//银行卡的照片
				bankAccountCardImgList: [{
						base64Str: '',
						size: '666',
						contentType: 'image/jpeg',
						name: 'front.jpg',
						owerType: 'bankAccountCard',
						owerId: this.$store.state.sysUser.userid,
						id: ''
					},
					{
						base64Str: '',
						size: '666',
						contentType: 'image/jpeg',
						name: 'back.jpg',
						owerType: 'bankAccountCard',
						owerId: this.$store.state.sysUser.userid,
						id: ''
					}
				],
				//资金流水记录分页
				flowRecord: {
					pageSize: 5,
					pageNo: ''
				},
				ruleForm: {
					id: '',
					cardName: '',
					cardNumber: '',
					bankName: '',
					branchName: '',
					branchAddress: ''
				},
				rules: {
					cardName: [{
						required: true,
						message: '请输入持卡人姓名',
						trigger: 'blur'
					}],
					cardNumber: [{
						required: true,
						message: '请输入银行卡号',
						trigger: 'blur'
					}],
					bankName: [{
						required: true,
						message: '请输入银行名称',
						trigger: 'blur'
					}],
					branchName: [{
						required: true,
						message: '请输入分行名称',
						trigger: 'blur'
					}],
					branchAddress: [{
						required: true,
						message: '请输入分行地址',
						trigger: 'blur'
					}]
				},
				//认证状态(true:已认证)
				authentication: false,
				activeName: 'first',
				tableData: [],
				userBankAccount:''
			}
		},
		methods: {
			handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
				this.flowRecord.pageSize = val
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.flowRecord.pageNo = val
			},
			recharge() {
				this.$prompt('当前账户余额(元)：' + this.accountBanlance, '充值', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
					inputErrorMessage: '金额格式不正确'
				}).then(({
					value
				}) => {
					this.$message({
						type: 'success',
						message: '您的充值金额是: ' + value
					});
				})
				//		        .catch(() => {
				//		          this.$message({
				//		            type: 'info',
				//		            message: '取消输入'
				//		          });       
				//		        });
			},
			unbound() {
					this.$confirm('您确定要解绑此银行卡？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.Unbind=false
				})
				
				
							        
			},
			//重新绑定银行卡
            bindBankCard(){
            	alert(1)
            },
			//绑定银行卡
			submitForm(formName) {
				const self = this;
				self.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.bankAccountCardImgList[0].base64Str == '') {
							this.$message.error('请上传银行卡正面照');
						} else if(this.bankAccountCardImgList[1].base64Str == '') {
							this.$message.error('请上传银行卡反面照');
						} else {
							//提交信息
							this.bankAccountCardImgList[0].owerId = this.ruleForm.id
						    this.bankAccountCardImgList[1].owerId = this.ruleForm.id
							const bankMessage = {
								id: this.ruleForm.id,
								accountName: this.ruleForm.cardName,
								accountNo: this.ruleForm.cardNumber,
								bankName: this.ruleForm.bankName,
								bankBranch: this.ruleForm.branchName,
								bankBranchAddress: this.ruleForm.branchAddress,
								bankAccountCardImgList: this.bankAccountCardImgList
							}
							this.btnBankCard = '上传中···'
							this.$api.userUpdateBankAccount(bankMessage).then(res => {
								console.log(bankMessage);
								
								if(res.data.code != 'SUCCESS') {
									this.btnBankCard = '重新上传'
									this.$message.error(res.data.message);
								} else if(res.data.code == 'SUCCESS') {
									this.$message.success("银行卡信息上传成功，请耐心等待审核");
									this.btnBankCard = '重新上传'
									this.authentication = true
									this.rejectedState = false
									this.bankState="资料待审核"
								} else {
									this.$message.error("出错了");

								}
							})
							//提交信息结束
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//上传银行卡照片
			commitBankImg(obj, num) {
				const _this = this;
				var file = document.getElementById(obj).files[0];
				this.bankAccountCardImgList[num].contentType = file.type;
				this.bankAccountCardImgList[num].name = file.name;
				this.bankAccountCardImgList[num].size = (file.size / 1024).toFixed(0);
				if((file.size / 1024).toFixed(0) > 1024) {
					this.$message.error("您上传的图片不能大于1M，请重新选择");
				} else if(file.type != "image/jpeg" && file.type != "image/png") {
					this.$message.error("请上传jpg、jepg或png格式的照片");
				} else {
					var r = new FileReader();
					r.onload = function() {
						_this.bankAccountCardImgList[num].base64Str = r.result;
						console.log(_this.bankAccountCardImgList[num])
					}
					r.readAsDataURL(file);
				}

			},
            getBankMsg(){
                 this.loading = true;
				this.$api.userBankAccount().then(res => {
					console.log(res.data);
					if(res.data.code == "SUCCESS") {
						this.userBankAccount=res.data.state
						
						this.loading = false
						this.btnBankCard = '重新上传'
						this.bankState="资料待审核"
						this.ruleForm.id=res.data.id
						this.ruleForm.cardName=res.data.accountName
						this.ruleForm.cardNumber=res.data.accountNo
						this.ruleForm.bankName=res.data.bankName
						this.ruleForm.branchName=res.data.bankBranch
						this.ruleForm.branchAddress=res.data.bankBranchAddress
						this.bankAccountCardImgList[0].base64Str=res.data.bankCardImg[0].base64Str
						this.bankAccountCardImgList[0].id=res.data.bankCardImg[0].id
						this.bankAccountCardImgList[1].base64Str=res.data.bankCardImg[1].base64Str
						this.bankAccountCardImgList[1].id=res.data.bankCardImg[1].id
					}else{
						this.loading = false
					}

				})
            },
			//
			getData() {
				//获取用户余额和投资金额。
				this.$api.userAccount().then(res => {
					// console.log(res.data);

				})
				
				

			},
			//用户资金流水部分
			userFlowRecord() {
				//获取用户账户资金流水记录总条数
				this.$api.userAccountFlowRecordCount().then(res => {
					this.totalRows = res.data.totalRows
				})
				//获取用户账户资金流水
				this.$api.userAccountFlowRecord(this.flowRecord).then(res => {
					this.tableData = res.data.list
				})
			},
			// 状态控制部分
			stateControl(){
				 const state = this.$store.state.sysUser.userState
				 const bankState = this.bankAccountState
                 if(state!='VERIFIED'){//还未进行投资人认证
                 	this.identityAuthentication=true
				    this.identityAuthenticationTwo=true
                 }
                 else if(bankState=='UNVERIFIED'){//投资人认证完成但未提交银行卡
                    this.identityAuthentication=false
				    this.identityAuthenticationTwo=true
                 }
                  else if(bankState=='AUDITING'){//银行卡审核中
                  	this.getBankMsg();
                    this.identityAuthentication=false
				    this.identityAuthenticationTwo=true
				    this.authentication = true
				    this.rejectedState=false
                 }
                 else if(bankState=='REJECTED'){//银行卡被驳回
                 	this.getBankMsg();
                 	this.rejectedState=true
                 	this.authentication=false
                    this.identityAuthentication=false
				    this.identityAuthenticationTwo=true
                 }
                 else if(bankState=='VERIFIED'){//银行卡审核通过
                    this.identityAuthentication=false
				    this.identityAuthenticationTwo=false
                 }
                 else {
                 	//alert(1)
                 }
			}
		},
		mounted() {
			this.getData();
			this.userFlowRecord()
			this.stateControl()
			
		}
	}
</script>

<style>
	.unbindCard{
		background: #CACACA;
    width: 100%;
    height: 120px;
    text-align: center;
    border-radius: 10px;
    padding-top: 20px;
    cursor: pointer;
	}
	.unbindCard p.text{
		font-size: 16px;
		margin-top: 10px;
		color: #fff;
	}
	.wallet .el-button--danger {
		background: #cb0000;
	}
	
	.el-message-box__header {
		background: #cb0000;
		color: #fff;
		text-align: center;
	}
	
	.el-message-box__title {
		font-size: 16px;
		color: #fff;
	}
	
	.el-message-box__headerbtn .el-message-box__close,
	.el-message-box__headerbtn .el-message-box__close:hover {
		color: #fff;
	}
	
	.el-message-box {
		border: none;
		border-radius: 5px;
	}
	
	.el-message-box__status.el-icon-warning {
		color: #cb0000;
	}
	
	.wallet-btn {
		text-align: center;
		padding-top: 30px;
	}
	
	.wallet-btn .el-button {
		width: 120px;
		border-radius: 4px;
		border: 1px solid #989898;
		color: #404040;
		transition: .2s;
	}
	
	.wallet-btn .el-button--danger,
	.wallet-btn .el-button:hover {
		border-radius: 4px;
		border: 1px solid #cb0000;
		color: #fff;
		background-color: #cb0000;
	}
	
	.el-pager li.active+li {
		border-left: 1px solid #ddd;
	}
	
	.el-pagination__editor {}
	
	.el-pagination {
		margin-top: 20px;
		text-align: right;
	}
	
	.el-pager li {
		border: 1px solid #ddd;
		margin-right: 4px;
	}
	
	.fund-details {
		margin-top: 30px;
	}
	
	.el-table thead th {
		background: #efeef3;
	}
	
	.el-table th,
	.el-table td {
		text-align: center;
	}
	.commitSuccess {
		text-align: center;
		margin-bottom: 30px;
		font-size: 20px
	}
	
	.commitSuccess img {
		margin-right: 15px;
	}
	#minshengbank {
		text-align: left;
		width: 96%;
		height: 50px;
		background: #f1f1f1;
		line-height: 50px;
		/* margin: 5px 17px 30px 17px;*/
		padding: 0 30px;
		color: #45454c;
		font-size: 14px;
	}
	
	#minshengbank img {
		position: relative;
		top: 5px;
		width: 90px;
	}
	
	.beforeAuthentication a {
		display: inline-block;
		font-size: 16px;
		color: rgb(203, 0, 0);
		border-bottom: 1px solid rgb(203, 0, 0);
		cursor: pointer;
	}
	
	.afterAuthentication {
		margin-top: 30px;
	}
	
	.card-message {
		float: left;
		width: 220px;
		height: 158px;
		border-radius: 5px;
		margin-left: 20px;
		margin-bottom: 20px;
		background: url(../../../static/img/donebank.png);
	}
	
	.authent {
		text-align: center;
		border-right: 1px solid #efeef3;
	}
	
	.authent dt {
		text-align: center;
		font-size: 16px;
	}
	
	.authent dt span {
		text-align: center;
		font-size: 24px;
	}
	
	.authent dd {
		font-size: 16px;
		color: #b5b5b5;
		padding-bottom: 10px;
		padding-top: 20px;
		text-align: center;
	}
	
	.bank_name {
		font-size: 20px;
		font-family: "microsoft yahei";
		font-weight: bold;
		color: rgb(86, 86, 86);
		margin: 10px 0px 0px 10px;
	}
	
	.bank_num {
		font-size: 20px;
		font-family: "microsoft yahei";
		font-weight: bold;
		color: rgb(86, 86, 86);
		margin: 15px 0px 0px 10px;
	}
	/*银行卡部分*/
	
	.identification {
		padding-top: 50px;
	}
	
	.card-img {
		margin-top: 20px;
		overflow: hidden;
	}
	
	.card-img-r {
		float: right;
		width: 160px;
	}
	
	.card-img-l {
		float: left;
		width: 160px;
	}
	
	.card-img p {
		text-align: center;
		margin-bottom: 15px;
	}
	
	.avatar-uploader .el-upload {
		width: 160px;
		height: 160px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 160px;
		height: 160px;
		line-height: 160px;
		text-align: center;
	}
	
	.avatar {
		width: 100%;
		height: 160px;
		display: block;
	}
	
	.identification_main {
		width: 350px;
		margin: auto;
	}
	
	.identification_main p.red {
		color: #CC0001;
		font-size: 16px;
		text-align: center;
		margin-top: 15px;
	}
	
	.identification_main h6 {
		font-size: 18px;
		text-align: center;
		font-weight: normal;
		position: relative;
	}
	
	.identification_main h6:before {
		content: "";
		width: 90px;
		height: 1px;
		background: #CCCCCC;
		margin-top: 20px;
		float: left;
		margin-left: 20px;
		position: absolute;
		left: 0;
		top: -8px;
	}
	
	.identification_main h6:after {
		content: "";
		width: 90px;
		height: 1px;
		background: #CCCCCC;
		margin-top: 20px;
		float: left;
		margin-left: 20px;
		position: absolute;
		right: 20px;
		top: -8px;
	}
	
	.identification_tips {
		width: 290px;
		margin: auto;
		margin-bottom: 20px;
		font-size: 14px;
		text-align: left;
		color: #CC0001;
		margin-top: 15px;
	}
</style>