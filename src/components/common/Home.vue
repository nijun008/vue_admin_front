<template>	
	<div class="home">
		<v-head></v-head>
		<div class="mian">
			<div class="w">
				<v-sidebar></v-sidebar>
			<div class="content">
				<transition name="move" mode="out-in">
					<keep-alive><router-view></router-view></keep-alive>
					
				</transition>
			</div>
			</div>			
		</div>

		<v-footer></v-footer>
	</div>
</template>

<script>
	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	import vFooter from './Footer.vue';
	export default {
		components: {
			vHead,
			vSidebar,
			vFooter
		},
		methods:{
			getData() {
				this.$api.userProfile().then(res => {
					console.log(res.data)
					if(res.data.headerImg==undefined){
						this.$store.state.user.headerImg = '../../../static/img/img.jpg'
					}else{
						this.$store.state.sysUser.setPaymentPass = res.data.setPaymentPassword;
						this.$store.state.user.headerImg = res.data.headerImg.base64Str;
						this.$store.state.user.nickname = res.data.nickname
						//console.log(this.$store.state.user.setPaymentPass)
						
					}
					
					this.$store.state.user.nickname = res.data.nickname;
				});
                this.$api.sysProfile().then(res => {
                	  console.log(res.data)
                	this.$store.state.sysUser.bankAccountState=res.data.bankAccountState
                    this.$store.state.sysUser.userState = res.data.state;
                     this.$store.state.sysUser.userid = res.data.id;
                    console.log(this.$store.state.sysUser.userState)
				});
			}
		},
		mounted(){
            this.getData();
		}
	}
</script>

<style>
	body{
		min-width: 1300px !important;
	}
	.w{
		width: 1120px;
		overflow: hidden;
		margin: auto;
	}
	.home{
		background: #f5f5f5;
	}
	.mian {
		overflow: hidden;
		width: 100%;
		margin-bottom: 30px;
		padding-top: 30px;
	}
	.home .content {
    margin-left: 266px;
    width: auto;
    padding: 40px;
    box-sizing: border-box;
    border: solid 1px #e6e6e6;
    background: #fff;
    min-height: 446px;
	}
</style>
