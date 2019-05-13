<template>
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
							<div class="col-lg-5 col-12">
							<button class="btn btn-info mb-2 mx-2 btn-sm" @click="sortFilms('year')">Sort by year
								<Icon name="sort-amount-up" v-if="sortingBy.year === 'asc'"></Icon>
								<Icon name="sort-amount-down" v-if="sortingBy.year === 'desc'"></Icon>
							</button>

							<button class="btn btn-info mb-2 mx-2 btn-sm" @click="sortFilms('name')">Sort by name
								<Icon name="sort-amount-up" v-if="sortingBy.name === 'asc'"></Icon>
								<Icon name="sort-amount-down" v-if="sortingBy.name === 'desc'"></Icon>
							</button>

							<button class="btn btn-info mb-2 mx-2 btn-sm" @click="sortFilms('genres')">Sort by genre
								<Icon name="sort-amount-up" v-if="sortingBy.genres === 'asc'"></Icon>
								<Icon name="sort-amount-down" v-if="sortingBy.genres === 'desc'"></Icon>
							</button>
							</div>


								<!--<b-input-group>-->
							<div class="col-lg-2">
								<b-form-select size="sm" v-model="yearFilterSelected" :options="yearFilter" @change="filterFilms($event, 'year')">
									<template slot="first">
										<option :value="null" disabled>-- Filter by year --</option>
									</template>
								</b-form-select>
							</div>

									<!--<b-input-group-append>-->
										<!--<b-button variant="outline-info" size="sm">reset</b-button>-->
									<!--</b-input-group-append>-->
								<!--</b-input-group>-->
							<div class="col-lg-2">
								<b-form-select size="sm" v-model="genreFilterSelected" :options="genreFilter" @change="filterFilms($event, 'genres')">
									<template slot="first">
										<option :value="null" disabled>-- Filter by genre --</option>
									</template>
								</b-form-select>
							</div>
							<div class="col-lg-3 col-12 ">
								<button class="btn btn-info mx-2 btn-sm" @click="resetFilters">
									<Icon name="redo" scale="1" title="clear filter"></Icon>
								</button>

								<div class="btn-group btn-group-toggle" data-toggle="buttons">
									<label class="btn btn-info btn-sm" @click="type.table = true">
										<Icon name="table"></Icon>
										<input type="radio" name="options" id="option1" autocomplete="off" checked> Table
									</label>
									<label class="btn btn-info active btn-sm" @click="type.cards = true">
										<Icon name="columns"></Icon>
										<input type="radio" name="options" id="option2" autocomplete="off"> Cards
									</label>
								</div>

								<b-button variant="info" class="mx-2" size="sm" @click="openAddingNewFilmModal">
									<Icon name="plus"></Icon>
								</b-button>
							</div>

						</div>
					</div>
					<hr>
					<div v-if="type.cards" class="row justify-content-center px-2">
						<film-card v-for="(film, index) in paginatedFilms" :film="film" :user-id="userId" :key="index"></film-card>
					</div>
					<div v-if="type.table" class="card-body row">
						<b-table
							ref="tableFilms"
							class="table-bordered"
							striped
							hover
							:fields="fields"
							:items="filteredFilms"
							@row-clicked="openFilm"
							per-page="5"
							:current-page="currentPage"
						>
							<template slot="actions" slot-scope="data">
								<button
									class="btn btn-info btn-sm"
									v-if="!userFilms.includes(data.item.id) && userId === loggedUser.id" >
									Add
								</button>
								<button
									class="btn btn-info btn-sm"
									v-if="userFilms.includes(data.item.id) && userId === loggedUser.id">
									Remove
								</button>
							</template>
							<template slot="poster" slot-scope="data">
								<b-img width="80px" height="80px" :src="data.value" fluid></b-img>
							</template>
							<template slot="genres" slot-scope="data">
								{{ data.item.genres.join(', ')}}
							</template>
						</b-table>
					</div>
					<hr>
					<div class="row">
						<!--<div class="col-3 align-self-center text-muted">-->
							<!--Showing 1 to 5 of {{ filteredFilms.length }} films-->
						<!--</div>-->
						<div class="col">
							<b-pagination
								class="justify-content-center"
								first-text="First"
								last-text="Last"
								v-model="currentPage"
								:total-rows="filteredFilms.length"
								:per-page="perPage"
								prev-text="Previous"
								next-text="Next"
							></b-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
		<add-change-film ref="addChangeFilm" :new-film="true" @new-film-added="updateFilmsWithAdded($event)"></add-change-film>
	</div>
</template>

<script>
	import orderBy from 'lodash/orderBy';
	import Icon from 'vue-awesome/components/Icon'
	import 'vue-awesome/icons/star';
	import 'vue-awesome/icons/redo';
	import 'vue-awesome/icons/sort-amount-up';
	import 'vue-awesome/icons/sort-amount-down';
	import 'vue-awesome/icons/table';
	import 'vue-awesome/icons/columns';
	import 'vue-awesome/icons/plus';
	import {getUserFilms} from "../../services/user/user.service";
	import filmCard from 'src/components/films/filmCard';
	import addChangeFilm from 'src/components/films/addChangeFilm';

	export default {
		name: "filmsLibrary",
		components: {
			Icon,
			filmCard,
			addChangeFilm
		},
		computed: {
			paginatedFilms() {
				return this.filteredFilms.slice(((this.currentPage - 1) * this.perPage), (this.currentPage * this.perPage));
			},
			userFilms() {
				return this.$store.getters.user.filmId;
			},
			loggedUser() {
				return this.$store.getters.user;
			}
		},
		watch: {
			filteredFilms(val) {
				if(this.type.table === true) {
					this.$refs.tableFilms.refresh();
				}
			},
			'type.table' (val) {
				if (val) {
					this.perPage = 5;
					this.type.cards = false;
				}
			},
			'type.cards' (val) {
				if (val) {
					this.perPage = 8;
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
					{key: 'poster', label: 'poster'},
					{key: 'name', label: 'Title'},
					{key: 'year', label: 'Year'},
					{key: 'producer', label: 'Producer'},
					{key: 'genres', label: 'Genre'},
					{key: 'actions', label: 'Actions'}
				],
				films: [],
				filteredFilms: [],
				filteredBy: {
				},
				sortingBy: {
				},
				userId: null,
				yearFilter: [],
				yearFilterSelected: null,
				genreFilter: [],
				genreFilterSelected: null,
				currentPage: 1,
				perPage: 8
			}
		},
		methods: {
			openFilm(film) {
				this.$store.dispatch('SET_SELECTED_FILM', film);
				this.$router.push({name: 'film', params: {filmId: film.id}});
			},
			openAddingNewFilmModal() {
				this.$refs.addChangeFilm.show();
			},
			sortFilms(name) {
				if(this.sortingBy[name] === 'asc') {
					this.sortingBy[name] = 'desc'
				} else if(this.sortingBy[name] === 'desc') {
					delete(this.sortingBy[name]);
				} else {
					this.sortingBy[name] = 'asc';
				}

				this.filteredFilms = orderBy(this.filteredFilms, Object.keys(this.sortingBy), Object.values(this.sortingBy));

			},
			resetFilters() {
				this.filteredFilms = this.films;
				this.yearFilterSelected = null;
				this.genreFilterSelected = null;
				this.filteredBy = {};
				this.sortingBy = {};
			},
			filterFilms(filterValue, filterName) {
				let filteredFilms = this.films;
				// at first save filter
				this.filteredBy[filterName] = filterValue;
				//and after filter films by all filters
				for (let filter in this.filteredBy) {
					if (this.filteredBy[filter] !== '') {
						filteredFilms = filteredFilms.filter(film => film[filter].includes(this.filteredBy[filter]));
					}

				}

				this.filteredFilms = filteredFilms;
			},
			setFilms(films) {
				this.films = films;
				this.filteredFilms = films;
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

			},
			updateFilmsWithAdded(addedFilm) {
				this.films.push(addedFilm);
			}
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