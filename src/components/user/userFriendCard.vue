<template>
	<div class="card my-2 mx-2 shadow p-3 mb-3 bg-white rounded">
		<div class="row ">
			<div class="col-4">
				<img :src="user.avatar" class="card-img">
			</div>
			<div class="col-8 px-3">
				<div class="row">
					<h4>{{userNameInfo}}</h4>
				</div>
				<div class="row">
					<div class="col align-items-center">
						<div class="btn-group-vertical">
							<button class="btn btn-outline-info" @click="goToCollection">View collection</button>
							<button class="btn btn-outline-info mt-1" @click="removeFromFriends">Remove from friends</button>
						</div>
					</div>
				</div>
				<!--<div class="card-block px-3">-->
				<!--</div>-->
			</div>

		</div>
	</div>
</template>

<script>
	import {updateFriends} from "../../services/user/user.service";

	export default {
		name: "userFriendCard",
		props: {
			user: Object
		},
		data() {
			return {
				// user: {
				// 	name: '',
				// 	surname: '',
				// }
			}
		},
		computed: {
			userNameInfo() {
				return this.user.name + ' ' + this.user.surname;
			},
			userId() {
				return this.$store.getters.userId;
			},
			friends() {
				return this.$store.getters.friends;
			}
		},
		watch: {
		},
		methods: {
			goToCollection() {
				this.$router.push({name: 'films', params: {userId: this.user.id}});
			},
			removeFromFriends() {
				const friendsAfterRemoving = this.friends.filter((user) => {
					return user.id !== this.user.id;
				});

				updateFriends(this.userId, friendsAfterRemoving.map((user) => {
					return user.id;
				}));

				this.$store.dispatch('SET_FRIENDS', friendsAfterRemoving);
			}
		}
	}
</script>

<style scoped>

</style>