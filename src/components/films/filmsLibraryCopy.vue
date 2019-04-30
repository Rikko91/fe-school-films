<template>
	<div class="container my-3 justify-content-center">
		<div class="row">
			<div class="card">

			</div>
			<div class="col-6">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter by ...</button>
						<div class="dropdown-menu">
							<a class="dropdown-item">Name</a>
							<a class="dropdown-item" href="#">Category</a>
							<a class="dropdown-item" href="#">Year</a>
							<div role="separator" class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Separated link</a>
						</div>
					</div>
					<input type="text" class="form-control" aria-label="Text input with dropdown button">
					<span class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">
            <i class="fa fa-search"></i>
        </button>
      </span>
				</div>
			</div>
			<div class="col-4">
				<button class="btn btn-info mb-2 mx-2">Sort by</button>
				<button class="btn btn-info mb-2 mx-2">Sort by</button>
				<button class="btn btn-info mb-2 mx-2">Sort by</button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="card col-3 mx-3 my-2">
				<img class="card-img-top" src="../../assets/326.jpg" @click="openFilm">
				<div class="card-body">
					<h3>test</h3>
					<p class="card-text">The Shawshank Redemption</p>
					<p class="card-text">Test2</p>
				</div>
			</div>
			<div class="card col-3 mx-3">
				<img class="card-img-top" src="../../assets/iron_man.jpg">
				<div class="card-body">
					<h3>test</h3>
					<p class="card-text">Iron Man</p>
					<p class="card-text">Test2</p>
				</div>
			</div>
			<div class="card col-3 mx-3">
				<img class="card-img-top" src="../../assets/forest_gamp.jpg">
				<div class="card-body">
					<h3>test</h3>
					<p class="card-text">Forest Gamp</p>
					<p class="card-text">Test2</p>
				</div>
			</div>
			<div class="card col-3 mx-3">
				<img class="card-img-top" src="../../assets/breaking_bad.jpg">
				<div class="card-body">
					<h3>test</h3>
					<p class="card-text">Breaking bad</p>
					<p class="card-text">Test2</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-3 align-self-center text-muted">
				Showing 1 to 10 of 41 films
			</div>
			<div class="col-9">
				<b-pagination class="" first-text="First" last-text="Last" total-rows="40" per-page="10" prev-text="Previous" next-text="Next"></b-pagination>
				<!--<nav aria-label="Page navigation example">-->
				<!--<ul class="pagination pagination-circle">-->
				<!--<li class="page-item"><a class="page-link" href="#">Previous</a></li>-->
				<!--<li class="page-item"><a class="page-link" href="#">1</a></li>-->
				<!--<li class="page-item"><a class="page-link" href="#">2</a></li>-->
				<!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
				<!--<li class="page-item"><a class="page-link" href="#">4</a></li>-->
				<!--<li class="page-item"><a class="page-link" href="#">Next</a></li>-->
				<!--</ul>-->
				<!--</nav>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "filmsLibrary",
		data() {
			return {

			}
		},
		methods: {
			openFilm() {
				this.$router.push('/film');
			}
		}
	}
</script>

<style scoped>

</style>