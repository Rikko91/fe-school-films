import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
require('bootstrap/dist/js/bootstrap');
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from 'src/store/index';
import axios from 'axios';
import router from 'src/router/index';
import 'nprogress/nprogress.css';
import {getUserInfo} from "src//services/user/user.service";

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
axios.defaults.baseURL = 'http://localhost:3000';



Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuex);

new Vue({
	store,
	router,
	render: h => h(App),
	beforeCreate() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			getUserInfo(user.id).then(userData => {
					this.$store.dispatch('LOGIN', userData)
			});

		}
	}
}).$mount('#app')
