<template>
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
					<h4> {{ userNameInfo }}</h4>
				</div>
				<div class="row">
					<div class="col align-items-center">
						<div class="btn-group-vertical">
							<button class="btn btn-outline-info">Approve</button>
							<button class="btn btn-outline-info mt-1">Decline</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "friendRequestCard",
		props: {
			request: Object
		},
		data() {
			return {

			}
		},
		computed: {
			userNameInfo() {
				return this.user.name + ' ' + this.user.surname;
			},
		}
	}
</script>

<style scoped>

</style>