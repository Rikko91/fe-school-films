import Vue from 'vue';
// import axios from 'axios';
import userModule from 'src/store/modules/user';
import filmModule from 'src/store/modules/film';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user: userModule,
		film: filmModule,
	}
	// state: {
	// 	status: '',
	// 	token: localStorage.getItem('token') || '',
	// 	user : {
	// 		id: null,
	// 		email: null
	// 	},
	// 	friends: []
	// },
	// mutations: {
	// 	LOGIN(state, user) {
	// 		state.user = user;
	// 		state.token = localStorage.getItem('token');
	// 	},
	// 	SET_FRIENDS(state, friends) {
	// 		state.friends = friends;
	// 	}
	// },
	// actions: {
	// 	LOGIN({commit}, user) {
	// 		commit('LOGIN', user);
	// 	},
	// 	SET_FRIENDS({commit}, friends) {
	// 		commit('SET_FRIENDS', friends);
	// 	}
	// },
	// getters: {
	// 	user: state => {
	// 		return state.user;
	// 	},
	// 	friends: state => state.friends,
	//
	// }
})
