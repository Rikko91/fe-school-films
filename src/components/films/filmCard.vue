<template>
	<div class="col-lg-3 col-sm-4 mb-4">
		<div class="card shadow-lg">
			<div class="my-card-image border-bottom rounded" :style="{'background-image': 'url(' + film.poster + ')'}" @click="openFilm">
			</div>
			<!--<img class="card-img-top" src="../../assets/326.jpg" @click="openFilm">-->
			<div class="card-body">
				<h5>{{ film.name}}</h5>
				<p class="card-text">{{ film.producer }}</p>
				<p class="card-text">{{ film.genres.join(', ')}} </p>
				<p class="card-text">
					<Icon name="star" class="checked"></Icon>
					<Icon name="star" class="checked"></Icon>
					<Icon name="star" class="checked"></Icon>
					<Icon name="star"></Icon>
					<Icon name="star"></Icon>
				</p>
				<button class="btn btn-info" v-if="!userFilms.includes(film.id) && userId === loggedUserId" @click="addFilmToGallery">Add to gallery</button>
				<button class="btn btn-info" v-if="userFilms.includes(film.id) && userId === loggedUserId" @click="removeFilmFromGallery">Remove from gallery</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Icon from 'vue-awesome/components/Icon'
	import 'vue-awesome/icons/star';
	import {updateFilms} from "../../services/user/user.service";
	export default {
		name: "filmCard",
		components: {
			Icon
		},
		props: {
			film: Object,
			userId: Number
		},
		computed: {
			userFilms() {
				return this.$store.getters.userFilms;
			},
			loggedUserId() {
				return this.$store.getters.user.id;
			}
		},
		data() {
			return {
			}
		},
		methods: {
			openFilm() {
				this.$store.dispatch('SET_SELECTED_FILM', this.film);
				this.$router.push({name: 'film', params: {filmId: this.film.id}});
			},
			addFilmToGallery() {
				this.$store.dispatch('ADD_NEW_FILM', this.film.id).then(() => {
					updateFilms(this.$store.getters.userId, this.$store.getters.user.filmId);
				});
			},
			removeFilmFromGallery() {
				this.$store.dispatch('REMOVE_FILM_FROM_USER', this.film.id).then(() => {
					updateFilms(this.$store.getters.userId, this.$store.getters.user.filmId);
				})
			}
		}
	}
</script>

<style scoped>
	.checked {
		color:orange;
	}

	.my-card-image {
		padding-top: 150%;
		background-size:100% 100%;
	}
</style>