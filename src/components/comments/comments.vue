<template>
	<div class="row">
		<div class="card w-100">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs" role="tablist">
					<li class="nav-item">
						<a
							class="nav-link active"
							href="#read-comments"
							id="user-comments-tab"
							role="tab"
							data-toggle="tab"
						>
							<h4 class="reviews text-capitalize">Comments</h4>
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							href="#add-comment"
							role="tab"
							data-toggle="tab"
						>
							<h4 class="reviews text-capitalize">Add comment</h4>
						</a>
					</li>
				</ul>
			</div>
			<div class="card-body">
				<div class="tab-content">
					<div class="tab-pane active" id="read-comments" role="tabpanel">
						<one-comment v-for="(comment, index) in comments" :comment="comment" :key="index"></one-comment>
					</div>
					<div class="tab-pane w-100" id="add-comment" role="tabpanel">
						<div class="card my-2 py-2 w-100">
							<div class="row">
								<div class="col-lg-2 my-auto">
									<span class="align-middle">Comments</span>
								</div>
								<div class="col-lg-10">
									<div class="card-body text-left">
										<textarea
											class="form-control comment-text-area"
											placeholder="Leave your comment"
											rows="4"
											v-model="textComment"
										></textarea>
									</div>
								</div>
							</div>
							<!--<div class="row">-->
								<!--<div class="col-2">-->
									<!--Attach video-->
								<!--</div>-->
								<!--<div class="col-10">-->
									<!--<div class="input-group mb-3">-->
										<!--<div class="input-group-prepend">-->
											<!--<span class="input-group-text">http://</span>-->
										<!--</div>-->
										<!--<input type="text" class="form-control" v-model="videoUrl">-->
									<!--</div>-->
								<!--</div>-->
							<!--</div>-->
							<div class="row">
								<div class="col">
									<button class="btn btn-info text-uppercase" @click="addComment" :disabled="!textComment">Add new comment</button>
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
	import {getComments} from "../../services/film/filmService";
	import oneComment from 'src/components/comments/oneComment';
	import dayjs from 'dayjs';
	import {addNewComment} from "src/services/film/filmService";
	export default {
		name: "comments",
		components: {
			oneComment
		},
		computed: {
			filmId() {
				return this.$store.getters.lastSelectedFilm.id;
			},
			userId() {
				return this.$store.getters.user.id;
			}
		},
		watch: {
			filmId(value) {
				getComments(value).then(comments => {
					this.comments = comments;
				})
			}
		},
		data() {
			return {
				comments: [],
				textComment: '',
			}
		},
		methods: {
			addComment() {
				let comment = {
					userId: this.userId,
					filmId: this.filmId,
					message: this.textComment,
					likes: '0',
					dislikes: '0',
					created: dayjs().format('YYYY-MM-DD')
				};

				addNewComment(comment);
			}
		},
		mounted() {
			getComments(this.filmId).then(comments => {
				this.comments = comments;
			})
		},
	}
</script>

<style scoped>

</style>