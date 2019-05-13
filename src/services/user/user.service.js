import axios from 'axios'

export function login(user) {
	return new Promise((resolve, reject) => {
//		commit('auth_request')
		axios.post('/login', user)
			.then(response => {
				const token = response.data.accessToken;
				// const user = response.data.user;
				localStorage.setItem('token', token);
				axios.defaults.headers.common['Authorization'] = token;
				// commit('auth_success', token, user);
				resolve(response);
			})
			.catch(err => {
				console.log(err);
				localStorage.removeItem('token');
				reject(err)
			})
	})
}

export function register(user) {
	return new Promise((resolve, reject) => {
		// commit('auth_request')
		axios.post('/register', user).then(response => {
			const token = response.data.token;
			localStorage.setItem('token', token);
			axios.defaults.headers.common['Authorization'] = token;
			// commit('auth_success', token, user);
			resolve(response);
		}).catch(err => {
			// commit('auth_error', err)
			localStorage.removeItem('token');
			reject(err)
		})
	})
}

export function logout(){
	return new Promise((resolve) => {
		//commit('logout');
		localStorage.removeItem('token');
		localStorage.removeItem('user')
		delete axios.defaults.headers.common['Authorization'];
		resolve();
	})
}

export function getFriends(id) {
	return axios.get('/users/' + id).then(response =>  {
		let getUserInfoPromises = [];
		response.data.friendsIds.forEach((friendId) => {
			getUserInfoPromises.push(getUserInfo(friendId));
		});

		return axios.all(getUserInfoPromises).then(users => {
			let usersInfo = [];
			users.forEach(user => {
				usersInfo.push( {
					id: user.id,
					name: user.name,
					surname: user.surname,
					avatar: user.avatar
				})
			});

			return usersInfo;
		})

	});
}

export async function getFriendsRequests(id) {
	return axios.get('/users/' + id).then(response =>  {
		let getUsersInfoPromises = [];
		let usersInfo = [];
		response.data.friendsRequests.forEach((friendRequest) => {
			getUsersInfoPromises.push(getUserInfo(friendRequest.userId).then(user => {
				usersInfo.push({
					id: user.id,
					name: user.name,
					surname: user.surname,
					avatar: user.avatar,
					type: friendRequest.type
				}
			)
			}));
		});

		return axios.all(getUsersInfoPromises).then(() => {
			return usersInfo;
		});
	});
}

export function getUserInfo(id) {
	return axios.get('/users/' + id).then(response => response.data)
}

export function updateFriends(id, friends) {
	return axios.patch('/users/' + id, {
		friendsIds: friends
	}).then(response => response.data);
}

export function saveAvatar(userId, avatar) {
	return axios.patch('/users/' + userId, {
		avatar: avatar
	}).then(response => response);
}

export function getUserFilms(userId) {
	return axios.get('/users/' + userId + '/films').then(response => response.data);
}

export function updateFilms(id, films) {
	return axios.patch('/users/' + id, {
		filmId: films
	}).then(response => response.data);
}

export function getUserByEmail(email) {
	return axios.get('/users?email=' + email).then(response => {
		return response.data;
	})
}

export function getAllUsers() {
	return axios.get('/users').then(response => response.data)
}