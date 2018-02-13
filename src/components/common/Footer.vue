<template>
	<div>

		<div class="wrap wrap-footer-nav">
			<div class="content footer-nav">
				<el-row>
					<el-col :span="15">
						<el-col :span="6" class="footer-nav-box" v-for="item in footerNav">
							<h4>{{ item.title }}</h4>
							<ul>
								<li v-for="i in item.linkList">
									<router-link :to="i.router">{{ i.title }}</router-link>
								</li>
							</ul>
						</el-col>
					</el-col>
					<el-col :span="9" class="footer-r">
						<router-link :to="'/'" class="buy-btn el-row">
							<el-col :span="6">￥499</el-col>
							<el-col :span="18" class="btn-r">购买原动力基因检测</el-col>
						</router-link>
						<router-link :to="'/'" class="buy-btn el-row">
							<el-col :span="6">￥1499</el-col>
							<el-col :span="18" class="btn-r">购买Y全序基因检测</el-col>
						</router-link>
						<p>联系热线：400-8000-6000<span>（周一至周五 9:00-17:30）</span></p>
					</el-col>
				</el-row>
			</div>
		</div>

		<div class="wrap wrap-footer">
			<div class="content footer">
				<p>©2017   www.yuandongli.com  原动力基因 all rights reserved.</p>
			</div>
		</div>

	</div>
</template>

<script>
export default {
 	data () {
 		return {
	 		footerNav: [
	 			{
	 				title: '关于产品',
	 				linkList: [
	 					{ title: '购买', router: '/createorder' },
	 					{ title: '检测流程', router: '/' },
	 					{ title: '基因club', router: '/' },
	 					{ title: '白皮书', router: '/' },
	 				]
	 			},
	 			{
	 				title: '结果示例',
	 				linkList: [
	 					{ title: '祖源分析', router: '/' },
	 					{ title: '运动健身', router: '/' },
	 					{ title: '遗传风险', router: '/' },
	 					{ title: '天赋基因', router: '/' },
	 				]
	 			},
	 			{
	 				title: '用户信息',
	 				linkList: [
	 					{ title: '登录', router: '/login' },
	 					{ title: '注册', router: '/register' },
	 					{ title: '个人中心', router: '/userinfo' },
	 				]
	 			},
	 			{
	 				title: '关于我们',
	 				linkList: [
	 					{ title: '关于我们', router: '/' },
	 					{ title: '加入我们', router: '/applyagent' },
	 					{ title: '服务协议', router: '/agreement' },
	 					{ title: '价格保护', router: '/' },
	 				]
	 			},
	 		]
	 	}
 	}
}
</script>

<style lang="less" scoped>
.wrap-footer-nav{
	background-color: #2b5b8d;
	padding: 33px 0 20px 0;
}
.footer-nav{
	padding-left: 10px;
	color: #fff;
}
.footer-nav a{
	color: #fff;
	&:hover{
		text-decoration: underline;
	}
}
.footer-nav-box{
	height: 188px;
}
.footer-nav-box h4{
	font-size: 20px;
	margin-bottom: 26px;
}
.footer-nav-box ul{
	line-height: 26px;
}
.footer-r{
	padding: 0 26px;
	border-left: 1px solid #557ca4;
	height: 188px;
	font-size: 16px;
}
.buy-btn{
	display: block;
	margin-bottom: 18px;
	text-align: center;
	line-height: 58px;
	border: 1px solid #fff;
	border-radius: 5px;
	overflow: hidden;
}
.buy-btn .btn-r{
	background: linear-gradient(to right, #67dfd0, #219efe);
}
.footer-r p span{
	font-size: 12px;
}
.wrap-footer{
	background-color: #1c4875;
	color: #fff;
	padding: 26px 0;
	line-height: 26px;
	text-align: center;
}
</style>