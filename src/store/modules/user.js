const userModule = {
	state: {
		isLogged: false,
		token: localStorage.getItem('token') || '',
		user : {},
		friends: [],
		friendRequests: []
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
		},
		ADD_FRIEND(state, user) {
			state.friends.push(user);
		},
		SET_FRIEND_REQUESTS(state, friendRequests) {
			state.friendRequests = friendRequests;
		},
		REMOVE_USER_FROM_FRIEND_REQUESTS(state, user) {
			state.friendRequests = state.friendRequests.filter((userFriendRequest) => {
				return userFriendRequest.id !== user.id;
			});
		},
		ADD_USER_FRIEND_REQUEST(state, user) {
			state.friendRequests.push(user);
		},
		CHANGE_USER_CREDENTIALS(state, credentials) {
			state.user.name = credentials.name;
			state.user.surname = credentials.surname;
		}
	},
	actions: {
		CHANGE_USER_CREDENTIALS({commit}, credentials) {
			commit('CHANGE_USER_CREDENTIALS', credentials);
		},
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
		},
		ADD_FRIEND({commit}, user) {
			commit('ADD_FRIEND', user);
		},
		SET_FRIEND_REQUESTS({commit}, friendRequests) {
			commit('SET_FRIEND_REQUESTS', friendRequests);
		},
		REMOVE_USER_FROM_FRIEND_REQUESTS({commit}, user) {
			commit('REMOVE_USER_FROM_FRIEND_REQUESTS', user);
		},
		ADD_USER_FRIEND_REQUEST({commit}, user) {
			commit('ADD_USER_FRIEND_REQUEST', user);
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
		},
		friendRequests: state => {
			return state.friendRequests;
		}

	}
};

export default userModule;