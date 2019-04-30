<template>
	<div>
	<div class="container my-3">
		<h2 class="text-left">{{ user.name }} {{ user.surname }}</h2>
		<div class="row">
			<div class="col-lg-2 col-sm-4">
				<img :src="avatar" class="card-img">
				<label class="btn btn-info my-2">
					Change avatar
					<Icon name="user-edit"></Icon>
					<input type="file" @change="onAvatarSelected" hidden>
				</label>
			</div>
			<div class="col-lg-5 col-sm-4">
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-append">
							<span class="input-group-text">Name</span>
						</div>
						<input type="text" class="form-control" v-model="user.name" readonly>
					</div>
					<div class="input-group my-2">
						<div class="input-group-append">
							<span class="input-group-text">Surname</span>
						</div>
						<input type="text" class="form-control" v-model="user.surname" readonly>
					</div>
					<div class="input-group my-2">
						<div class="input-group-append">
							<span class="input-group-text">Year of birth</span>
						</div>
						<input type="text" class="form-control" v-model="user.year" readonly>
					</div>
					<div class="input-group my-2">
						<div class="input-group-append">
							<span class="input-group-text">City</span>
						</div>
						<input type="text" class="form-control" v-model="user.city" readonly>
					</div>
				</div>
			</div>
			<div class="col-lg-2 col-sm-2 my-auto">
				<div class="row">
					<div class="col-12">
						<button class="btn btn-outline-info">Change data</button>
					</div>

				</div>
				<div class="row">
					<div class="col-12">
						<span class="text-muted"> Your unique id is: 123456</span>
					</div>

				</div>

			</div>
		</div>
		<hr>
		<div class="row my-4 justify-content-between">
			<div class="col-lg-5  col-sm-12">
				<div class="card border-info shadow mb-3 bg-white rounded">
					<div class="card-header">
						<h5>You have {{friends.length}} friends</h5>
					</div>
					<template v-for="friend in friends" v-if="friends">
						<user-friend-card :user="friend" :key="friend.id"></user-friend-card>
					</template>
				</div>
			</div>
			<div class="col-lg-5 col-sm-12">
				<div class="card border-info shadow mb-3 bg-white rounded">
					<div class="card-header">
						<h5>Friends requests</h5>
					</div>

					<div class="card my-2 mx-2 shadow p-3 mb-3 bg-white rounded">
						<div class="row">
							<div class="col">
								<div class="alert alert-info" role="alert">You got friend request</div>
							</div>
						</div>
						<div class="row ">
							<div class="col-4">
								<img src="../../assets/no-avatar.png" class="card-img">
							</div>
							<div class="col-8 px-3">
								<div class="row">
									<h4> John Doe</h4>
								</div>
								<div class="row">
									<div class="col align-items-center">
										<div class="btn-group-vertical">
											<button class="btn btn-outline-info">Accept</button>
											<button class="btn btn-outline-info mt-1">Decline</button>
										</div>
									</div>
								</div>
								<!--<div class="card-block px-3">-->
								<!--</div>-->
							</div>

						</div>
					</div>
					<div class="card my-2 mx-2 shadow p-3 mb-3 bg-white rounded">
						<div class="row ">
							<div class="col-4">
								<img src="../../assets/no-avatar.png" class="card-img">
							</div>
							<div class="col-8 px-3">
								<div class="row">
									<h4> John Doe</h4>
								</div>
								<div class="row">
									<span>You have send friend request</span>
									<span>You request is waiting for approval</span>
								</div>
								<!--<div class="card-block px-3">-->
								<!--</div>-->
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import Icon from 'vue-awesome/components/Icon';
	import 'vue-awesome/icons/user-edit';
	import userFriendCard from 'src/components/user/userFriendCard';
	import {getFriends, saveAvatar} from "src/services/user/user.service";
	export default {
		name: "Profile",
		components: {
			Icon,
			userFriendCard
		},
		data() {
			return {
				avatar: '',
			}
		},
		computed: {
			friends() {
				return this.$store.getters.friends;
			},
			user() {
				return this.$store.getters.user;
			}
		},
		methods: {
			onAvatarSelected(event) {
				let avatar = event.target.files[0];
				if (typeof FileReader === 'function') {
					let reader = new window.FileReader();
					reader.onload = event => {
						console.log(event.target.result);
						saveAvatar(this.user.id, event.target.result);
						this.avatar = event.target.result;
					};

					reader.readAsDataURL(avatar);
				}
			}
		},
		created() {
			this.avatar = this.user.avatar;
			getFriends(this.user.id).then(friends => {
				this.$store.dispatch('SET_FRIENDS', friends);
			});
		}
	}
</script>

<style scoped>
	.btn{
		font-size: 14px;
	}
</style>