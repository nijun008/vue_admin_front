/**
 * Created on 2017/11/03
 */
import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api'
import state from './state.js'

Vue.use(Vuex);
const userStore = new Vuex.Store({
			state,
			mutations: {
				login: (state, data) => {
					localStorage.token = data;
					state.token = data;
				},
				logout: (state) => {
					localStorage.removeItem('token');
					state.token = null
				}
				
			},
			getters: {
				headPic(state) {
					return state.user.headPic + '1'
				} 
			}
			});

		export default userStore;