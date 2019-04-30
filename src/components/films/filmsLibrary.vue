<template>
	<div>
	<div class="container my-3 justify-content-center">
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div class="row">
						</div>
						<div class="input-group mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="Enter text to search"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
							>
							<div class="input-group-append">
								<button class="btn btn-outline-info" type="button">Search</button>
							</div>
						</div>
						<div class="row">

							<button class="btn btn-info mb-2 mx-2">Sort by year</button>
							<button class="btn btn-info mb-2 mx-2">Sort by name</button>
							<button class="btn btn-info mb-2 mx-2">Sort by genre</button>
							<div class="col">
								<!--<select id="inputState" class="form-control">-->
									<!--<option hidden>Filter by year</option>-->
									<!--<option>1995</option>-->
									<!--<option>2003</option>-->
								<!--</select>-->
								<b-input-group>
									<b-form-select v-model="yearFilterSelected" :options="yearFilter">
										<template slot="first">
											<option :value="null" disabled>-- Filter by year --</option>
										</template>
									</b-form-select>
									<b-input-group-append>
										<b-button variant="outline-info">reset</b-button>
									</b-input-group-append>
								</b-input-group>
							</div>
							<div class="col">
								<!--<select id="inputState" class="form-control">-->
									<!--<option hidden>Filter by genre</option>-->
									<!--<option>Action</option>-->
									<!--<option>Thriller</option>-->
								<!--</select>-->
								<b-form-select v-model="genreFilterSelected" :options="genreFilter">
									<template slot="first">
										<option :value="null" disabled>-- Filter by genre --</option>
									</template>
								</b-form-select>
							</div>
							<div class="col">
								<div class="btn-group btn-group-toggle" data-toggle="buttons">
									<label class="btn btn-info" @click="type.table = true">
										<input type="radio" name="options" id="option1" autocomplete="off" checked> Table
									</label>
									<label class="btn btn-info active" @click="type.cards = true">
										<input type="radio" name="options" id="option2" autocomplete="off"> Cards
									</label>
								</div>
							</div>
						</div>
					</div>
					<hr>
					<div v-if="type.cards" class="row justify-content-center px-2">
						<film-card v-for="(film, index) in films" :film="film" :user-id="userId" :key="index"></film-card>
					</div>
					<div v-if="type.table" class="card-body row">
						<b-table class="table-bordered" striped hover :fields="fields" :items="films">
							<template slot="actions">
								<b-button  size="sm"> Add to my gallery</b-button>
							</template>
						</b-table>
					</div>
					<hr>
					<div class="row">
						<div class="col-3 align-self-center text-muted">
							Showing 1 to 10 of 41 films
						</div>
						<div class="col-9">
							<b-pagination class="" first-text="First" last-text="Last" total-rows="40" per-page="10" prev-text="Previous" next-text="Next"></b-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import BButton from "bootstrap-vue/src/components/button/button";
	import Icon from 'vue-awesome/components/Icon'
	import 'vue-awesome/icons/star';
	import {getUserFilms} from "../../services/user/user.service";
	import filmCard from 'src/components/films/filmCard';
	import Film from "./film";
	import BFormSelect from "bootstrap-vue/src/components/form-select/form-select";
	import BInputGroup from "bootstrap-vue/src/components/input-group/input-group";
	import BInputGroupAppend from "bootstrap-vue/src/components/input-group/input-group-append";
	export default {
		name: "filmsLibrary",
		components: {BInputGroupAppend, BInputGroup, BFormSelect, Film, BButton, Icon, filmCard},
		computed: {
			userFilms() {
				return this.$store.getters.user.filmId;
			}
		},
		watch: {
			'type.table' (val) {
				if (val) {
					this.type.cards = false;
				}
			},
			'type.cards' (val) {
				if (val) {
					this.type.table = false
				}
			},
			films(val) {
				if (val) {
					this.setYearFilter();
					this.setGenreFilter();
				}
			},
			userFilms() {
				if (this.userId === this.$store.getters.user.id) {
					this.films.forEach((film, index, array) => {
						if (!this.$store.getters.user.filmId.includes(film.id)) {
							array.splice(index, 1);
						}
					});
				}
			}
		},
		data() {
			return {
				type: {
					table: false,
					cards: true
				},
				fields: [
					{key: 'name', label: 'Title'},
					{key: 'year', label: 'Year'},
					{key: 'producer', label: 'Producer'},
					{key: 'genres', label: 'Genre'},
					{key: 'actions', label: 'Actions'}
				],
				films: [],
				userId: null,
				yearFilter: [],
				yearFilterSelected: null,
				genreFilter: [],
				genreFilterSelected: null
			}
		},
		methods: {
			setFilms(films) {
				this.films = films
			},
			setUserId(id) {
				this.userId = parseInt(id);
			},
			setYearFilter() {
				let years = [];
				this.films.forEach(film => {
					if (!years.includes(film.year)) {
						years.push(film.year);
					}
				});

				this.yearFilter = years;

			},
			setGenreFilter() {
				let genres = [];
				this.films.forEach(film => {
					film.genres.forEach(genre => {
						if (!genres.includes(genre)) {
							genres.push(genre);
						}
					})

				});

				this.genreFilter = genres;

			}
		},
		created() {
		},
		beforeRouteEnter(to , from , next) {
			getUserFilms(to.params.userId).then(films => {
				next(vm => {
					vm.setFilms(films);
					vm.setUserId(to.params.userId);
				})
			})
		}
	}
</script>

<style scoped>
</style>