<template>
	<div class="hello">
		<h2 class="my-20">Registration</h2>
		<div class="container align-items-center">
			<div class="card col-6 mx-auto bg-info">
				<form @submit.prevent="register">
					<div class="form-group">
						<label for="email">Email address</label>
						<input type="text" v-model="user.email" name="email" class="form-control mx-auto" placeholder="Enter email" required/>
						<span class="error" v-if="$v.user.email.$invalid">
                            Error. This field should have a correct email address!
                        </span>
					</div>
					<div class="form-group">
						<label for="username">Your name</label>
						<input type="text" v-model="user.name" name="name" class="form-control mx-auto" placeholder="Enter name">
					</div>
					<div class="form-group">
						<label for="username">Your surnamename</label>
						<input type="text" v-model="user.surname" name="surname" class="form-control mx-auto" placeholder="Enter surname">
					</div>
					<div class="form-group">
						<label for="password">Your password</label>
						<input type="password" v-model="user.password" name="password" class="form-control mx-auto" placeholder="Enter password">
					</div>
					<div class="form-group">
						<label for="passwordRepeated">Repeat password please</label>
						<input type="password" v-model="passwordRepeated" name="passwordRepeated" class="form-control mx-auto" placeholder="Enter password one more">
					</div>
					<div clas="form-group">
						<button type="submit" class="btn btn-outline-light mb-2">Register</button>
						<router-link to="/login" class="btn btn-link">Go back to Login page</router-link>
					</div>
				</form>
			</div>
		</div>

	</div>
</template>

<script>
	import {register as registerUser, getUserByEmail} from "src/services/user/user.service";
	import {email} from 'vuelidate/lib/validators';
	export default {
		name: "Registration",
		components: {
		},
		data() {
			return {
				user: {
					email: '',
					name: '',
					surname: '',
					password: '',
				},
				passwordRepeated: ''
			}
		},
		methods: {
			register() {
				getUserByEmail(this.user.email).then(existingUsers => {
					if (existingUsers.length === 0) {
						registerUser(this.user).then(() => {
							this.$router.push({ name: 'login'})
						});
					}
				});
			}
		},
		validations: {
			user: {
				email: {
					email
				}
			}
		}
	}
</script>

<style scoped>
	.hello {
		margin-top: 20px;
	}
	a {
		color: #f8f9fa;
	}
	.error{
		color: ivory;
	}
</style>