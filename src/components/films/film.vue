<template>
	<div>
	<div class="container align-items-end">
		<div class="row">
			<h3 >{{ film.name }}</h3>
		</div>
		<div class="row">
			<div class="col-lg-3 col-sm-4">
				<img :src="film.poster" class="img-fluid img-thumbnail rounded" style="width: 300px; height: 350px">
			</div>
			<div class="col-lg-9">
				<table class="table table-striped">
					<tbody>
						<tr class="text-left">
							<td class="film-info">Year</td>
							<td class="">{{ film.year }}</td>
						</tr>
						<tr class="text-left">
							<td class="film-info">Country</td>
							<td>{{ film.country }}</td>
						</tr>
						<tr class="text-left">
							<td class="film-info">Producer</td>
							<td>{{ film.producer }}</td>
						</tr>
						<tr class="text-left">
							<td class="film-info">Genre</td>
							<td>{{ film.genres.join(', ') || ''}}</td>
						</tr>
						<tr class="text-left">
							<td class="film-info">Average Rating</td>
							<td>
								<Icon name="star" class="checked"></Icon>
								<Icon name="star" class="checked"></Icon>
								<Icon name="star" class="checked"></Icon>
								<Icon name="star"></Icon>
								<Icon name="star"></Icon>
								<!--<span class="fa fa-star checked"></span>-->
								<!--<span class="fa fa-star checked"></span>-->
								<!--<span class="fa fa-star"></span>-->
								<!--<span class="fa fa-star"></span>-->
							</td>
						</tr>
						<tr>
							<td>

							</td>
						</tr>
					</tbody>
				</table>
				<span>{{film.description}}</span>
				<div class="row my-2">
					<b-button variant="info" @click="showModal">
						<Icon name="edit"></Icon>
						Edit
					</b-button>
				</div>
			</div>
		</div>
		<h2>Comments</h2>
		<comments></comments>
		<add-change-film :new-film="false" ref="addChangeFilm"></add-change-film>
	</div>
	</div>
</template>

<script>
	import Icon from 'vue-awesome/components/Icon'
	import 'vue-awesome/icons/star';
	import 'vue-awesome/icons/edit';
	import Header from '../main/header';
	import comments from 'src/components/comments/comments';
	import {getFilmById} from "../../services/film/filmService";
	import addChangeFilm from 'src/components/films/addChangeFilm';
	export default {
		components: {
			Icon,
			Header,
			comments,
			addChangeFilm
		},
		name: "Film",
		data() {
			return {
				film: {
					poster: '',
					year: '',
					country: '',
					producer: '',
					genres: [],
					description: ''
				}
			}
		},
		computed: {
			lastSelectedFilm() {
				return this.$store.getters.lastSelectedFilm;
			},
		},
		watch: {
			lastSelectedFilm(value) {
				this.film = value;
			},
			'$store.state.film.lastSelectedFilm'(val) {
			}
		},
		methods: {
			showModal() {
				this.$refs.addChangeFilm.show();
			},
			setFilm(film) {
				Object.assign(this.film, film);
				if (!this.lastSelectedFilm.id) {
					this.$store.dispatch('SET_SELECTED_FILM', film);
				}
			}
		},
		beforeRouteEnter(to , from , next) {
			getFilmById(to.params.filmId).then(film => {
					next(vm => {
						vm.setFilm(film);
					})
				}
			)
		}
	}
</script>

<style scoped>
	/*.comment-text-area{*/
		/*min-width: 100%;*/
		/*max-width: 100%;*/
	/*}*/
	.test{
		background: lightblue;
	}
	td.film-info{
		color:red;
	}
	.checked{
		color:orange;
	}
</style>