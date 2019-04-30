const userModule = {
	state: {
		isLogged: false,
		token: localStorage.getItem('token') || '',
		user : {},
		friends: []
	},
	mutations: {
		LOGOUT(state) {
			state.token = '';
			state.isLogged = false;
			state.user = {}
		},
		LOGIN(state, user) {
			state.user = user;
			state.token = localStorage.getItem('token');
			state.isLogged = true;
		},
		SET_FRIENDS(state, friends) {
			state.friends = friends;
		},
		ADD_NEW_FILM(state, filmId) {
			state.user.filmId.push(filmId);
		},
		REMOVE_FILM_FROM_USER(state, filmId) {
			let index = state.user.filmId.indexOf(filmId);
			if( index > -1) {
				state.user.filmId.splice(index, 1);
			}
		}
	},
	actions: {
		LOGOUT({commit}) {
			commit('LOGOUT');
		},
		LOGIN({commit}, user) {
			commit('LOGIN', user);
		},
		SET_FRIENDS({commit}, friends) {
			commit('SET_FRIENDS', friends);
		},
		ADD_NEW_FILM({commit}, filmId) {
			commit('ADD_NEW_FILM', filmId);
		},
		REMOVE_FILM_FROM_USER({commit}, filmId) {
			commit('REMOVE_FILM_FROM_USER', filmId);
		}
	},
	getters: {
		user: state => {
			return state.user
		},
		userId: state => {
			return state.user.id;
		},
		userFilms: state => {
			return state.user.filmId || [];
		},
		friends: state => {
			return state.friends || [];
		},
		isLogged: state => {
			return state.isLogged;
		}

	}
};

export default userModule;