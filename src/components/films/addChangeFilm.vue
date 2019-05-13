<template>
		<b-modal
			v-model="showModal"
			id="loginModal"
			:title="modalTitle"
			size="lg"
			@ok="addOrChangeFilm"
		>
			<div class="form-row">
				<div class="col-lg-3 col-sm-4">
					<img :src="film.poster" class="img-fluid img-thumbnail rounded" style="width: 200px; height: 250px">
					<label class="btn btn-info my-2">
						Load poster
						<Icon name="film"></Icon>
						<input type="file" @change="loadPoster" hidden>
					</label>
				</div>
				<div class="col-lg-9 col-sm-4">
					<b-card bg-variant="light">
						<b-form-group
							label-cols-sm="3"
							label="Load from imdb:"
							label-align-sm="right"
							label-for="imdb-key"
							v-if="newFilm"
						>
							<b-input-group>
								<b-input-group-prepend>
									<b-form-select v-model="imdbSearchType">
										<option value="i">by IMDb ID</option>
										<option value="t">by Title</option>
									</b-form-select>
								</b-input-group-prepend>
								<b-form-input v-model="imdbFilmId"></b-form-input>
								<b-input-group-append>
									<b-button variant="info" @click="loadFilmFromImdb">Load</b-button>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
						<b-alert variant="danger" v-model="showImdbAlert" dismissible> Movie not found</b-alert>

						<b-form-group
							label-cols-sm="3"
							label="Title:"
							label-align-sm="right"
							label-for="film-title"
						>
							<b-form-input id="film-title" v-model="film.name"></b-form-input>
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="Year:"
							label-align-sm="right"
							label-for="nested-state"
						>
							<b-form-input id="film-year" v-model="film.year"></b-form-input>
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="Country:"
							label-align-sm="right"
							label-for="film-country"
						>
							<b-form-input id="film-country" v-model="film.country"></b-form-input>
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="Producer:"
							label-align-sm="right"
							label-for="film-producer"
						>
							<b-form-input id="film-producer" v-model="film.producer"></b-form-input>
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="Genres:"
							label-align-sm="right" class="mb-0"
						>
							<b-form-checkbox-group class="row" stacked id="interface_port_type" v-model="film.genres">
								<b-form-checkbox class="col-4" v-for="genre in genres" :value="genre" :key="genre">{{ genre }}</b-form-checkbox>
							</b-form-checkbox-group>
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="Description:"
							label-align-sm="right"
							label-for="film-description"
						>
							<b-form-textarea
								id="film-description"
								placeholder="Write a film description here"
								rows="3"
								max-rows="8"
								v-model="film.description"
							></b-form-textarea>
						</b-form-group>
					</b-card>
				</div>
			</div>
			<Loading :active.sync="isLoading" color="lightblue"></Loading>
		</b-modal>
</template>

<script>
	import Loading from 'vue-loading-overlay';
	// Import stylesheet
	import 'vue-loading-overlay/dist/vue-loading.css';
	import Icon from 'vue-awesome/components/Icon';
	import 'vue-awesome/icons/film';
	import {getAllGenres, getFilmFromImdb, addNewFilm as addNewFilmToDb} from "src/services/film/filmService";
	import {updateFilms} from "src/services/user/user.service";
	import {updateFilm} from "src/services/film/filmService";

	export default {
		name: "addChangeFilm",
		components: {
			Icon,
			Loading
		},
		props: {
			newFilm: Boolean
		},
		computed: {
			userId() {
				return this.$store.getters.user.id
			},
			selectedFilm() {
				return this.$store.getters.lastSelectedFilm;
			}
		},
		data() {
				return {
					isLoading: false,
					film: {
						poster: require('../../assets/no-film-poster.jpg'),
						name: '',
						year: '',
						country: '',
						producer: '',
						genres: [],
						description: ''
					},
					showModal: false,
					modalTitle: 'Add film',
					genres: [],
					selected: null,
					poster: '',
					title: '',
					year: '',
					text: '',
					id: '',
					user: '',
					posterFile: null,
					imdbFilmId: '',
					imdbSearchType: 'i',
					showImdbAlert: false
				}
		},
		methods: {
			loadFilmFromImdb() {
				this.isLoading = true;
				getFilmFromImdb(this.imdbSearchType, this.imdbFilmId).then(imdbFilmData => {
					if (imdbFilmData.Response === 'True') {
						this.showImdbAlert = false;
						this.film.poster = imdbFilmData.Poster;
						this.film.country = imdbFilmData.Country;
						this.film.name = imdbFilmData.Title;
						this.film.year = imdbFilmData.Year;
						this.film.producer = imdbFilmData.Director;
						this.film.genres = imdbFilmData.Genre.split(', ') || [];
					}
					else {
						this.showImdbAlert = true;
					}

					this.isLoading = false;
				})
			},
			loadPoster(event) {
				let poster = event.target.files[0];
				if (typeof FileReader === 'function') {
					let reader = new window.FileReader();
					reader.onload = event => {
					//	saveAvatar(this.user.id, event.target.result);
						this.film.poster = event.target.result;
					};

					reader.readAsDataURL(poster);
				}
			},
			show() {
				if (!this.newFilm) {
					Object.assign(this.film, this.selectedFilm);
				}

				this.showModal = true;
			},
			hide() {
				this.showModal = false;
			},
			addNewFilm() {
				addNewFilmToDb(this.film).then(insertedFilm => {
					this.$store.dispatch('ADD_NEW_FILM', insertedFilm.id).then(() => {
						updateFilms(this.$store.getters.userId, this.$store.getters.user.filmId);
						this.$emit('new-film-added', insertedFilm);
					});
				});
			},
			changeFilm() {
				updateFilm(this.film).then(updatedFilm => {
					 this.$store.dispatch('SET_SELECTED_FILM', updatedFilm);
				})
			},
			addOrChangeFilm() {
				if (this.newFilm) {
					this.addNewFilm();
				}
				else {
					this.changeFilm()
				}

			}
		},
		created() {
			getAllGenres().then(genres => {
				this.genres = genres;
			})
		}
	}
</script>

<style scoped>

</style>