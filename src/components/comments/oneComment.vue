<template>
	<div class="card my-2">
		<div class="row ">
			<div class="col-lg-2 col-sm-12">
				<img :src="comment.user.avatar" class="card-img">
			</div>
			<div class="col-lg-10 col-sm-12">
				<div class="card-block text-left">
					<h5>{{comment.user.name}} {{comment.user.surname}}</h5>
					<span class="text-muted">{{comment.created}}</span>
					<p class="card-text">{{comment.message}}</p>
					<!--<p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>-->
					<!--<p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
					<ul class="list-inline pull-left">
						<li class="list-inline-item mx-2">
							<a class="" href="#" @click="setLike('likes')">
								<Icon name="thumbs-up"></Icon> {{comment.likes}}
							</a>
						</li>
						<li class="list-inline-item mx-2">
							<a class="" href="#" @click="setLike('dislikes')">
								<Icon name="thumbs-down"></Icon> {{comment.dislikes}}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Icon from 'vue-awesome/components/Icon'
	import 'vue-awesome/icons/thumbs-up';
	import 'vue-awesome/icons/thumbs-down';
	import {updateComment} from "../../services/film/filmService";
	export default {
		name: "oneComment",
		components: {
			Icon
		},
		props: {
			comment: Object
		},
		data() {
			return {
				isLikeSet: false
			}
		},
		methods: {
			setLike(type) {
				if (!this.isLikeSet) {
					this.isLikeSet = true;
					this.comment[type] ++;
					let comment = Object.assign({}, this.comment);
					delete comment.user;
					updateComment(comment);
				}
			}
		}
	}
</script>

<style scoped>

</style>