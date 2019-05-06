<template>
	<div class="card my-2 mx-2 shadow p-3 mb-3 bg-white rounded">
		<div class="row">
			<div class="col">
				<div class="alert alert-info" role="alert">You got friend request</div>
			</div>
		</div>
		<div class="row ">
			<div class="col-4">
				<img :src="userAvatar" class="card-img">
			</div>
			<div class="col-8 px-3">
				<div class="row">
					<h4>{{ userNameInfo }}</h4>
				</div>
				<div class="row">
					<div class="col align-items-center" v-if="user.type === 'incoming'">
						<div class="btn-group-vertical" >
							<button class="btn btn-outline-info" @click="addToFriend">Accept</button>
							<button class="btn btn-outline-info mt-1" @click="removeFromRequests">Decline</button>
						</div>
					</div>
					<div class="row" v-else>
						<span>You have send friend request</span>
						<span>You request is waiting for approval</span>
					</div>
				</div>
				<!--<div class="card-block px-3">-->
				<!--</div>-->
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "userFriendRequestCard",
		props: {
			user: Object
		},
		computed: {
			userNameInfo() {
				return `${this.user.name} ${this.user.surname}`
			},
			friends() {
				return this.$store.getters.friends;
			},
			friendRequests() {
				return this.$store.getters.friendRequests;
			},
			userAvatar() {
				return this.user.avatar || require('../../assets/no-avatar.png');
			}
		},
		data() {
			return {

			}
		},
		methods: {
			addToFriend() {
				delete this.user.type;
				this.$store.dispatch('ADD_FRIEND', this.user).then(() => {
					this.$store.dispatch('REMOVE_USER_FROM_FRIEND_REQUESTS', this.user);
				});
			},
			removeFromRequests() {
				this.$store.dispatch('REMOVE_USER_FROM_FRIEND_REQUESTS', this.user);
			}
		}
	}
</script>

<style scoped>

</style>