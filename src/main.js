import Vue from 'vue';
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 //import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-red/index.css'    // 红色主题
import "babel-polyfill"

require('swiper/dist/css/swiper.css')

Vue.use(VueAwesomeSwiper)

import api from './api'
import moment from 'moment'

Vue.prototype.$moment = moment;
Vue.prototype.$api=api
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


