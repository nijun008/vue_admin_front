<template>  
  <div class="home">
    <v-head></v-head>
    <div class="mian">
      <div class="w">
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view>
              
            </router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHead from '../common/Header.vue';
import vFooter from '../common/Footer.vue';
export default {
  components: {
    vHead,
    vFooter
  },
  data () {
    return {

    }
  },
  mounted () {
    
  },
  methods:{

  },
}
</script>
<style>
</style>
