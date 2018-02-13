<template>
	<div class="wrap header-wrap">
		<div class="content">
			<el-row>
				<el-col :span="5" >
					<router-link :to="'/'">
						<img src="../../../static/img/logo.png">
					</router-link>
				</el-col>
				<el-col :span="15">
					<ul class="nav el-row">
						<li v-for="item in nav" class="el-col-">
							<router-link :to="item.router">{{ item.title }}</router-link>
						</li>
					</ul>
				</el-col>
				<el-col :span="4" v-if="mobile">
					{{ mobile }} | <a href="javascript:void(0)" @click="logout">退出</a>
				</el-col>
				<el-col :span="4" v-else>
					<ul class="login-group el-row">
						<li class="el-col-"><router-link :to="'/login'">登陆</router-link></li>
						<li class="el-col- line"></li>
						<li class="el-col-"><router-link :to="'/register'">注册</router-link></li>
					</ul>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			nav: [
				{ title: '首页', router: '/' },
				{ title: '采集示例', router: '/analyse' },
				{ title: '实验室介', router: '/' },
				{ title: '结果案例', router: '/' },
				{ title: '购买', router: '/createorder' },
			]
		}
	},
	computed: {
		headerImg() {
			return this.$store.state.user.headerImg ;
		},
		name() {
			return this.$store.state.user.nickname;
		},
		loginState(){
			return this.$store.state.loginState;
		},
		mobile(){
			//return this.$store.state.mobile;
			return localStorage.getItem('mobile');
		}
	},
	methods: {
		logout () {
			this.$api.logout().then(res => {
				this.$store.commit('logout')
				this.$router.push('/login');
				localStorage.removeItem('mobile');
			})
		}	
	},
	created() {
		this.logIn = localStorage.token;
	}
}
</script>

<style lang="less">
@import "../../../static/css/global.less";
.header-wrap{
	padding:  22px 0;
	line-height: 56px;
	font-size: 16px;
}
.nav{
	
}
.nav>li{
	margin-left: 70px;
}
.nav>li>a{
	display: block;
	width: 100%;
	text-align: center;
	color: @aDefault;
	&:hover, & .router-link-active {
		color: @mainColor;
	}
}
.login-group{
	background: linear-gradient(to right, @mainColor, #67dfd0);
	width: 151px;
	border-radius: 5px;
	overflow: hidden;
}
.login-group .line{
	width: 1px;
	background-color: #fff;
	height: 22px;
	margin-top: 17px;
}
.login-group a{
	display: block;
	width: 74px;
	text-align: center;
	color: #fff;
}
</style>