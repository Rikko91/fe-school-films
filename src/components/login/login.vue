<template>
	<div class="hello">
		<!--<Header></Header>-->
		<h2 class="my-20">Login</h2>
		<div class="container align-items-center">
			<div class="card bg-info col-6 mx-auto shadow-lg p-3 mb-5 rounded">
				<form @submit.prevent="submit">
					<div class="form-group my-5">
						<label for="username">Your email</label>
						<input type="text" required v-model="email" name="email" class="form-control mx-auto col-8" placeholder="Enter username here"/>
					</div>
					<div class="form-group my-5">
						<label for="password">Your password</label>
						<input type="password" v-model="password" name="password" class="form-control mx-auto col-8" placeholder="Enter your password here">
					</div>
					<div clas="form-group">
						<button @click="login" class="btn btn-outline-light mb-2">Login</button>
						<router-link to="/register" class="btn btn-link">Create a new account</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {login as userServiceLogin, getUserInfo} from 'src/services/user/user.service';
export default {
	name: 'Login',
	components: {
	},
	computed: {
		user() {
			return {
				email: this.email,
				password: this.password
			};
		}
	},
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		submit() {
			//this.$router.push('films');
		},
		login() {
			userServiceLogin(this.user).then(
				response => {
					let base64Url = response.data.accessToken.split('.')[1];
					let base64 = base64Url.replace('/-/g', '+').replace('/_/g', '/');
					let payload = JSON.parse(window.atob(base64));
					let userId = payload.sub;

					getUserInfo(userId).then(userData => {
						localStorage.setItem('user', JSON.stringify(userData));
						delete userData.password;
						this.$store.dispatch('LOGIN', userData).then(
							() => this.$router.push({ name: 'films', params: { userId: userId }})
						);
					});


				},
				error => {
					//set the user is not exist
				}
			);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #f8f9fa;
}
</style>
