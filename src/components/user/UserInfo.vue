<template>
	<div>
		<div class="user-content">
			<el-tabs v-model="activeTab">
				<el-tab-pane
					name="first"
					label="个人中心">
					<el-row class="user-row" :gutter="10">
						<el-col :span="6" class="user-label">
							我的推荐码:
						</el-col>
						<el-col :span="18">
							<span class="user-code">879fa9sf</span>
							<router-link class="tui-btn" :to="'/'">邀请好友一起注册</router-link>
						</el-col>
					</el-row>
					<el-row class="user-row" :gutter="10">
						<el-col :span="6" class="user-label">
							我的电话号码:
						</el-col>
						<el-col :span="18">
							12879512392
						</el-col>
					</el-row>
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
.user-label{
	text-align: right;
}
.user-row{
	line-height: 54px;
	margin-top: 20px;
}
.user-code{
	color: @mainColor;
}
.tui-btn{
	.btn(180px, 52px, inline-block, #fff);
	background-color: @mainColor;
	margin-left: 40px;
}
</style>