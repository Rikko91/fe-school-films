<template>
	<div class="card my-2 mx-2 shadow p-3 mb-3 bg-white rounded">
		<div class="row">
			<div class="col">
				<div class="alert alert-info" role="alert" v-if="user.type==='incoming'">You got friend request</div>
			</div>
		</div>
		<div class="row ">
			<div class="col-4">
				<img :src="userAvatar" class="card-img">
			</div>
			<div class="col-8">
				<div class="row">
					<div class="col align-items-center">
						<h5>{{ userNameInfo }}</h5>
					</div>

				</div>
				<div class="row">
					<div class="col align-items-center" v-if="user.type === 'incoming'">
						<div class="btn-group-vertical" >
							<button class="btn btn-outline-info btn-sm" @click="addToFriend">
								<Icon name="check" color="lightgreen"></Icon>
								Accept
							</button>
							<button class="btn btn-outline-info mt-1 btn-sm" @click="removeFromRequests">
								<Icon name="times" color="red"></Icon>
								Decline
							</button>
						</div>
					</div>
					<div class="col align-items-center" v-else-if="user.type === 'outcoming'">
						<b-alert show>
							You friend request is waiting for approval
						</b-alert>
					</div>
					<div class="col align-items-center" v-else>
						<div class="btn-group-vertical" v-if="userId !== user.id && !isUserFriend">
							<button class="btn btn-outline-info" @click="sendAddRequest">Send add request</button>
						</div>
						<div v-else>
							<Icon name="check" color="lightgreen"></Icon>
							Already in your friend list
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import Icon from 'vue-awesome/components/Icon';
	import 'vue-awesome/icons/check';
	import 'vue-awesome/icons/times';
	export default {
		name: "userFriendRequestCard",
		components: {
			Icon
		},
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
			},
			userId() {
				return this.$store.getters.user.id;
			},
			isUserFriend() {
				return this.friends.some((friend) => {
					return friend.id === this.user.id
				});
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
			},
			sendAddRequest() {
				this.user.type = 'outcoming';
				this.$store.dispatch('ADD_USER_FRIEND_REQUEST', this.user);
			}
		}
	}
</script>

<style scoped>

</style>