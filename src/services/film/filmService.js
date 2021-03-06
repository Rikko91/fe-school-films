import axios from 'axios';
import {getUserInfo} from "../user/user.service";

export function getComments(filmId) {
	return axios.get(`/films/${filmId}/comments`).then(response => {
		let comments = response.data;
		let getUserForComment = [];
		comments.forEach((comment, index) => {
			getUserForComment.push(getUserInfo(comment.userId).then(userInfo => {
				comments[index].user = {
					name: userInfo.name,
					surname: userInfo.surname,
					avatar: userInfo.avatar
				};
			}));
		});

		return axios.all(getUserForComment).then(() => {
			return comments
		})
	});
}

export function updateComment(comment) {
	return axios.patch(`/comments/${comment.id}` , comment).then(response => response.data);
}

export function getFilmById(id) {
	return axios.get(`/films/${id}`).then(response => response.data);
}

export function addNewComment(comment) {
	return axios.post('/comments', comment).then(response => {
		return response.data;
	})
}

export function getAllGenres() {
	return axios.get('/genres').then(response => response.data);
}

export function getFilmFromImdb(searchType, filmId) {
	return axios.get(`http://www.omdbapi.com/?${searchType}=${filmId}&apikey=bb534259`)
		.then(response => response.data)
}

export function addNewFilm(filmData) {
	return axios.post('/films', filmData).then(response => response.data);
}
export function updateFilm(film) {
	return axios.patch(`/films/${film.id}`, film).then(response => response.data);
}