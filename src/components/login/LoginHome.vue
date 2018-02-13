<template>
  <div>
		<div class="wrapper">
      <v-head></v-head>
      <div class="login-content">
        <transition name="move" mode="out-in">
          <router-view>
            
          </router-view>
        </transition>
      </div>
      <v-footer></v-footer>
    </div>
	</div> 
</template>

<script>
import vHead from '../common/Header.vue';
import vFooter from '../common/Footer.vue';
export default {
  components:{
    vHead, vFooter
  },
  methods:{
    _logIn(){
    // if(localStorage.getItem('token') != ''){
      localStorage.clear('token')
      this.$store.state.logOut=false
    }
  },
  mounted() {
    this._logIn();
  }
}
</script>
<style>
.main{
  width: 100%;
}
.clearfix{
	overflow: hidden;
}
</style>