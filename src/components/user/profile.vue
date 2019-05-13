<template>
	<div>
	<div class="container my-3">
		<h2 class="text-left">{{ user.name }} {{ user.surname }}</h2>
		<div class="row">
			<div class="col-lg-2 col-sm-4">
				<img :src="avatar" class="card-img">
				<label class="btn btn-info my-2" v-if="isDataChanging">
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
						<input type="text" class="form-control" v-model="userData.name" :readonly="!isDataChanging">
					</div>
					<div class="input-group my-2">
						<div class="input-group-append">
							<span class="input-group-text">Surname</span>
						</div>
						<input type="text" class="form-control" v-model="userData.surname" :readonly="!isDataChanging">
					</div>
					<div class="input-group my-2">
						<div class="input-group-append">
							<span class="input-group-text">Year of birth</span>
						</div>
						<input type="text" class="form-control" v-model="userData.year" :readonly="!isDataChanging">
					</div>
					<!--<div class="input-group my-2">-->
						<!--<div class="input-group-append">-->
							<!--<span class="input-group-text">City</span>-->
						<!--</div>-->
						<!--<input type="text" class="form-control" v-model="user.city" readonly>-->
					<!--</div>-->
				</div>
			</div>
			<div class="col-lg-2 col-sm-2 my-auto">
				<div class="row">
					<div class="col-12">
						<button class="btn btn-outline-info" v-if="!isDataChanging" @click="isDataChanging = !isDataChanging">Change data</button>
						<button class="btn btn-outline-info" v-else @click="saveUserData">
							<Icon name="check"></Icon>
							Save
						</button>
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
					<template v-for="friend in friends">
						<user-friend-card :user="friend" :key="friend.id"></user-friend-card>
					</template>
				</div>
			</div>
			<div class="col-lg-5 col-sm-12">
				<div class="card border-info shadow mb-3 bg-white rounded">
					<div class="card-header">
						<ul class="nav nav-tabs card-header-tabs" role="tablist">
							<li class="nav-item">
								<a
									class="nav-link active"
									href="#current-friend-requests"
									id="user-comments-tab"
									role="tab"
									data-toggle="tab"
								>
									<h5 class="reviews text-capitalize">Current requests <b-badge variant="info">{{ friendRequests.length }}</b-badge></h5>
								</a>
							</li>
							<li class="nav-item">
								<a
									class="nav-link"
									href="#add-new-friend-request"
									role="tab"
									data-toggle="tab"
								>
									<h5 class="reviews text-capitalize">Add new friend</h5>
								</a>
							</li>
						</ul>
					</div>
					<div class="card-body">
						<div class="tab-content">
							<div class="tab-pane active" id="current-friend-requests" role="tabpanel">
								<user-friend-request-card v-for="(user, index) in friendRequests" :user="user" :key="index"></user-friend-request-card>
							</div>
							<div class="tab-pane w-100" id="add-new-friend-request" role="tabpanel">
								<b-form-input placeholder="find user" @input="findUsers"></b-form-input>
								<user-friend-request-card v-for="(user, index) in usersForAddRequest" :user="user" :key="index"></user-friend-request-card>
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
	import 'vue-awesome/icons/check';
	import userFriendCard from 'src/components/user/userFriendCard';
	import userFriendRequestCard from 'src/components/user/userFriendRequestCard';
	import {getFriends, saveAvatar, getFriendsRequests, getAllUsers} from "src/services/user/user.service";
	import throttle from 'lodash/throttle';
	export default {
		name: "Profile",
		components: {
			Icon,
			userFriendCard,
			userFriendRequestCard
		},
		data() {
			return {
				isDataChanging: false,
				avatar: '',
				allUsers: [],
				usersForAddRequest: [],
				userData: {
					name: '',
					surname: '',
					year: ''
				}
			}
		},
		computed: {
			friends() {
				return this.$store.getters.friends;
			},
			user() {
				return this.$store.getters.user;
			},
			friendRequests() {
				return this.$store.getters.friendRequests;
			}
		},
		methods: {
			saveUserData() {
				this.$store.dispatch('CHANGE_USER_CREDENTIALS', this.userData).then(() => {
						this.isDataChanging = false;
				});
			},
			findUsers: throttle(function(userString) {
				if (userString === '') {
					this.usersForAddRequest = [];
					return;
				}

				let filteredUsers = this.allUsers.filter((user) => {
					return user.name.includes(userString) || user.surname.includes(userString)
				});

				this.usersForAddRequest = filteredUsers;
			}, 1000),
			onAvatarSelected(event) {
				let avatar = event.target.files[0];
				if (typeof FileReader === 'function') {
					let reader = new window.FileReader();
					reader.onload = event => {
						saveAvatar(this.user.id, event.target.result);
						this.avatar = event.target.result;
					};

					reader.readAsDataURL(avatar);
				}
			}
		},
		created() {
			this.userData.name = this.user.name;
			this.userData.surname = this.user.surname;
			this.userData.year = this.user.year;

			this.avatar = this.user.avatar;
			getFriends(this.user.id).then(friends => {
				this.$store.dispatch('SET_FRIENDS', friends);
			});

			getFriendsRequests(this.user.id).then(friendRequests => {
				this.$store.dispatch('SET_FRIEND_REQUESTS', friendRequests);
			});

			getAllUsers().then(users => {
				this.allUsers = users;
			});
		}
	}
</script>

<style scoped>
	.btn{
		font-size: 14px;
	}
</style>