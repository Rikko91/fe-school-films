<template>
	<header class="navbar navbar-expand-lg navbar-light bg-info">
		<a class="navbar-brand" href="#">
			<img src="../../assets/popcorn.svg" style="width: 150px; max-height: 50px">
		</a>

		<div class="navbar-nav ml-auto">
			<label class="btn btn-info my-2 border-right" @click="goToFilms">
				Films
				<Icon name="film"></Icon>
				<input type="button" hidden>
			</label>
			<label class="btn btn-info my-2 border-right" @click="goToProfile">
				My profile
				<Icon name="user"></Icon>
				<input type="button" hidden>
			</label>
			<label class="btn btn-info my-2 border-right" @click="logout">
				{{isLogged}}
				<Icon name="sign-out-alt"></Icon>
				<input type="button" hidden>
			</label>

		</div>
	</header>
</template>

<script>
	import Icon from 'vue-awesome/components/Icon';
	import 'vue-awesome/icons/film';
	import 'vue-awesome/icons/user';
	import 'vue-awesome/icons/sign-out-alt';
	import {logout as userLogout} from "src/services/user/user.service";

	export default {
		name: "Header",
		components: {
			Icon
		},
		data() {
			return {

			}
		},
		computed: {
			isLogged() {
				if (this.$store.getters.userId) {
					return 'Logout';
				}

				return 'Login';
			}
		},
		methods: {
			goToProfile() {
				this.$router.push({name: 'profile'});
			},
			goToFilms() {
				this.$router.push({ name: 'films', params: { userId: this.$store.getters.userId}});
			},
			logout() {
				userLogout().then(() => {
					this.$store.dispatch('LOGOUT').then(() => {
						this.$router.push({name: 'login'});
					});
				});
			}
		}
	}
</script>

<style scoped>
	/*.navbar-brand {*/
		/*position: relative;*/
		/*background: url(../../assets/logo.jpg);*/
		/*width: 100px;*/
		/*height: 50px;*/
		/*left: 15px;*/
		/*background-size: contain;*/
	/*}*/
</style>