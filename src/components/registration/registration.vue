<template>
	<div class="hello">
		<h2 class="my-20">Registration</h2>
		<div class="container align-items-center">
			<div class="card col-6 mx-auto bg-info">
				<form @submit.prevent="register">
					<div class="form-group">
						<label for="email">Email address</label>
						<input type="text" v-model="user.email" name="email" class="form-control mx-auto" placeholder="Enter email" required/>
						<b-alert class="mt-2" variant="danger" :show="$v.user.email.$invalid">
                            This field should have a correct email address!
                        </b-alert>
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
						<b-alert class="mt-2" variant="danger" :show="$v.user.password.$invalid">
							Password must have at least {{ $v.user.password.$params.minLength.min }} letters.
						</b-alert>
					</div>
					<div class="form-group">
						<label for="passwordRepeated">Repeat password please</label>
						<input type="password" v-model="user.passwordRepeated" name="passwordRepeated" class="form-control mx-auto" placeholder="Enter password one more">
						<b-alert class="mt-2" variant="danger" :show="$v.user.passwordRepeated.$invalid">
							Passwords must be identical
						</b-alert>
					</div>
					<b-alert
						variant="danger"
						fade
						:show="showAlert">
						{{ alertMessage }}
					</b-alert>
					<div clas="form-group">
						<button type="submit" class="btn btn-outline-light mb-2" :disabled="$v.$invalid">Register</button>
						<router-link to="/login" class="btn btn-link">Go back to Login page</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import {register as registerUser, getUserByEmail} from "src/services/user/user.service";
	import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';
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
					passwordRepeated: '',
				},
				showAlert: false,
				alertMessage: ''
			}
		},
		methods: {
			register() {
				getUserByEmail(this.user.email).then(existingUsers => {
					if (existingUsers.length === 0) {
						registerUser({
							email: this.user.email,
							name: this.user.name,
							surname: this.user.surname,
							password: this.user.password
						}).then(() => {
							this.showToast('You have successfully registered and will be redirected to the login page in 5 seconds');
							setTimeout(() => this.$router.push({ name: 'login'}), 5000);
						});
					} else {
						this.alertMessage = 'Users with this email already exists! Please change an email address';
						this.showAlert = true;
					}
				});
			},
			showToast(message) {
				this.$bvToast.toast(message, {
					title: 'Information',
					autoHideDelay: 5000,
					variant: 'info'
				});
			}
		},
		validations: {
			user: {
				email: {
					required,
					email
				},
				password: {
					required,
					minLength: minLength(6)
				},
				passwordRepeated: {
					sameAsPassword: sameAs('password')
				}
			},
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