const filmModule = {
	state: {
		lastSelectedFilm: {},
	},
	mutations: {
		'SET_SELECTED_FILM'(state, film) {
			Object.assign(state.lastSelectedFilm, film);
		}
	},
	actions: {
		'SET_SELECTED_FILM'({commit}, film) {
			commit('SET_SELECTED_FILM', film);
		}
	},
	getters: {
		lastSelectedFilm: (state) => {
			return state.lastSelectedFilm;
		}
	}
};

export default filmModule;