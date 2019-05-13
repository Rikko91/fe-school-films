<template>
		<b-modal
			v-model="showModal"
			:title="modalTitle"
			hide-footer
			hide-header
			size="lg"
			<!--content-class="bg-dark text-light"-->
		>
			<b-form-row>
				<b-col lg="3" class="pb-2">
					<div class="posterContainer">
						<img class="rounded" :src="poster" alt="Card image" style="border-radius: 3px; width: 100%">
						<div class="changePosterButton">
							<b-button variant="primary" size="sm" v-b-tooltip.hover title="Change poster">
								<i class="fas fa-pencil-alt"></i>
							</b-button>
							<input type="file" class="fileInput" ref="file" >
						</div>
					</div>
				</b-col>
				<b-col lg="9" class="pl-3">
					<div class="d-flex justify-content-between">
						<h3 v-if="!id">Add new film</h3>
						<h3 v-else>Update film</h3>
						<div>
							<b-button variant="secondary" size="sm" >Cancel</b-button>
							<b-button v-if="!id" variant="primary" size="sm" class="ml-2" >Save</b-button>
							<b-button v-if="id" variant="primary" size="sm" class="ml-2" >Update</b-button>
						</div>
					</div>
					<hr class="m-0">
					<b-row class="my-2" v-if="!id">
						<b-col lg="3" class="d-flex align-items-center">
							<label class="m-0" for="addFilmImdb">IMDB:</label>
						</b-col>
						<b-col lg="9">
							<b-input-group>
								<b-form-input v-model="imdbId" placeholder="IMDB id" class="input" size="sm" id="addFilmImdb" type="text"></b-form-input>
								<b-input-group-append>
									<b-button size="sm" class="input" variant="outline-secondary"><i class="fas fa-search"></i></b-button>
								</b-input-group-append>
							</b-input-group>
						</b-col>
					</b-row>
					<b-row class="my-2">
						<b-col lg="3" class="d-flex align-items-center">
							<label class="m-0" for="addFilmTitle">Title:</label>
						</b-col>
						<b-col lg="9">
							<b-form-input v-model="title" placeholder="title" class="input" size="sm" id="addFilmTitle" type="text"></b-form-input>
						</b-col>
					</b-row>
					<b-row class="my-2">
						<b-col lg="3" class="d-flex align-items-center">
							<label class="m-0" for="addFilmYear">Year:</label>
						</b-col>
						<b-col lg="9">
							<b-form-input v-model="year" placeholder="year" class="input" size="sm" id="addFilmYear" type="number"></b-form-input>
						</b-col>
					</b-row>
					<b-row class="my-2">
						<b-col lg="3">
							<label class="m-0">Genre:</label>
						</b-col>
						<b-col lg="9">
							<b-row no-gutters v-for="(oneGenre, index) in genresArray">
								<b-col lg="11" cols="11">
									<b-form-select v-model="oneGenre.selected" :options="oneGenre.genres" size="sm" class="input"></b-form-select>
								</b-col>
								<b-col lg="1" cols="1">
									<b-button block variant="outline-danger" size="sm" class="border border-dark"><i class="fas fa-minus"></i></b-button>
								</b-col>
							</b-row>

							<div class="text-right">
								<b-row no-gutters>
									<b-col lg="11" cols="11">
									</b-col>
									<b-col lg="1" cols="1">
										<b-button block variant="outline-primary" size="sm" class="border border-dark" ><i class="fas fa-plus"></i></b-button>
									</b-col>
								</b-row>
							</div>
						</b-col>
					</b-row>
					<b-row class="my-2">
						<b-col lg="3">
							<label class="m-0" for="addFilmText">Text:</label>
						</b-col>
						<b-col lg="9">
							<b-form-textarea
								v-model="text"
								id="addFilmText"
								size="sm"
								placeholder="Enter something..."
								rows="3"
								class="input"
							></b-form-textarea>
						</b-col>
					</b-row>
				</b-col>
			</b-form-row>
		</b-modal>
</template>

<script>
	export default {
		name: "addChangeFilm",
		data() {
				return {
					showModal: false,
					modalTitle: 'Add film',
					genres: [],
					genresArray: [],
					selected: null,
					poster: '',
					title: '',
					year: '',
					text: '',
					id: '',
					user: '',
					posterFile: null,
					imdbId: ''
				}
		},
		methods: {
			show() {
				this.showModal = true;
			},
			hide() {
				this.showModal = false;
			},
		}
	}
</script>

<style scoped>

</style>