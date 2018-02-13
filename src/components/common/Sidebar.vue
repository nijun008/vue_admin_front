<template>
	<div class="sidebar">
		<div class="sidebar-info">
			<div class="sidebar-avatar">
				<img :src="headerImg">
			</div>
			<p class="sidebar-name">{{name}}</p>
			<!--<p class="sidebar-sum">0</p>
			<p class="sidebar-text">累计收益(元)</p>-->
		</div>
		<el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="#ffff" unique-opened router active-text-color="#ffffff">
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index">
						<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
						<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index">
						<i :class="item.icon"></i>{{ item.title }}
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import store from '../../store'
	export default {
		data() {
			return {
				items: [{
						icon: 'el-icon-setting',
						index: 'accountinfo',
						title: '账号信息'
					},
					{
						icon: 'el-icon-warning',
						index: 'mywallet',
						title: '我的钱包'
					},
					{
						icon: 'el-icon-view',
						index: 'investmentlog',
						title: '投资记录'
					}
					
				]
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			},
			headerImg() {
				return this.$store.state.user.headerImg ;
			},
			name(){
				return this.$store.state.user.nickname;
			}
		}
	}
</script>

<style scoped>
	.content {
    /* background: none repeat scroll 0 0 #fff; */
    margin-left: 250px;
    width: auto;
    padding: 40px;
    box-sizing: border-box;
    border-left: solid 1px #e6e6e6;
}
	.sidebar-info {
		background: #fff;
		text-align: center;
		
		padding-bottom: 40px;
	}
	
	.sidebar-avatar {
		margin-top: 50px;
		width: 150px;
		height: 150px;
		overflow: hidden;
		border-radius: 50%;
		position: relative;
		margin-left: auto;
		margin-right: auto;
	}
	.sidebar .el-menu-vertical-demo .el-menu-item,.sidebar .el-menu-vertical-demo .el-menu-item i{
		color: #333;
	}
	.sidebar .el-menu-vertical-demo .el-menu-item:hover,.sidebar .el-menu-vertical-demo .el-menu-item:hover i,.sidebar .el-menu-vertical-demo .el-menu-item.is-active i{
		color: #fff;
	}
	.sidebar-name {
		margin-top: 5px;
		color: #606060;
		font-size: 24px;
	}
	
	.sidebar-sum {
		margin-top: 30px;
		color: #cb0000;
		font-size: 32px;
	}
	
	.sidebar-text {
		margin-top: 16px;
		color: #606060;
	}
	
	.sidebar-avatar img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	
	.sidebar {
		display: block;
		float: left;
		width: 250px;
		left: 0;
		top: 70px;
		bottom: 0;
		background: #2E363F;
		background: #fff;
		border: solid 1px #e6e6e6;
		position: static;
	}
	
	.sidebar>ul {
		height: 100%;
		 border-right: none;
		 background: #fff;
	}
	
	.el-menu-item.is-active {
		background-color: #cb0000;
		color: #fff;
	}
	
	.el-menu-item {
		font-size: 18px;
		text-align: center;
		padding-left: 0 !important;
	}
	
	.el-menu-item:hover {
		background-color: #cb0000;
		color: #fff;
	}
	
	.el-menu-item:hover i {
		color: #fff;
	}
</style>