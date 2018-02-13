<template>
	<div>
		<div class="user-content">
			<el-tabs v-model="activeTab">
				<el-tab-pane
					name="first"
					label="修改密码">
					<el-form
						label-width="260px" class="user-modify">
						<el-form-item label="输入旧密码:">
							<el-input 
								v-model="modifyForm.password" 
								type="password" 
								style="width: 275px;"
								autocomplete="off">
							</el-input>
						</el-form-item>
						<el-form-item label="设置新密码:">
							<el-input 
								v-model="modifyForm.newPassword" 
								type="password" 
								style="width: 275px;"
								autocomplete="off">
							</el-input>
						</el-form-item>
						<el-form-item label="确认新密码:">
							<el-input 
								v-model="modifyForm.newPasswordAgin" 
								type="password" 
								style="width: 275px;"
								autocomplete="off">
							</el-input>
						</el-form-item>
						<el-form-item>
							<a href="javascript:void(0)" class="modify-submit">确定</a>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			activeTab: 'first',
			modifyForm: {
				password: '',
				newPassword: '',
				newPasswordAgin: '',
			}
		}
	}
}
</script>

<style lang="less">
@import url(../../../static/css/global.less);
.user-content {
	padding-top: 20px;
	padding-left: 30px;
	background-color: #fff;
	min-height: 600px;
}
.user-content .el-tabs__item{
	font-size: 20px;
}
.user-modify{
	margin-top: 40px;
}
.modify-submit{
	.btn(274px, 40px, block, #fff);
	background-color: @mainColor;
}
</style>