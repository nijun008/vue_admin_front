<template>	
	<div class="home">
		<v-head></v-head>
		<div class="user-wrap wrap mian">
			<div class="w content">
				<el-row>
					<el-col :span="5">
						<user-sidebar></user-sidebar>
					</el-col>
					<el-col :span="19">
						<div>
							<transition name="move" mode="out-in">
								<keep-alive>
									<router-view>
									
									</router-view>
								</keep-alive>
							</transition>
						</div>
					</el-col>
				</el-row>
			</div>			
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
import vHead from '../common/Header.vue';
import userSidebar from '../common/UserSidebar.vue';
import vFooter from '../common/Footer.vue';
export default {
	components: {
		vHead,
		userSidebar,
		vFooter
	},
	mounted(){
    //this.getData();
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
}
</script>

<style>
.user-wrap{
	background-color: #f5f5f5;
	padding: 26px 0;
}
</style>
