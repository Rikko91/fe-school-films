import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter);

import NProgress from 'nprogress';
import Registration from 'src/components/registration/registration';
import Login from 'src/components/login/login';
import FilmLibrary from 'src/components/films/filmsLibrary';
import Film from 'src/components/films/film';
import Profile from 'src/components/user/profile';
const Register = Registration;
const LoginPage = Login;
const FilmsLibrary = FilmsLibrary;
const routes = [
	{ path: '/register', component: Register, name: 'register' },
	{ path: '/login', component: LoginPage, name: 'login'},
	{ path: '/', component: LoginPage},
	{ path: '/user/:userId/films', component: FilmLibrary, name: 'films' },
	{ path: '/film/:filmId', component: Film , name: 'film'},
	{ path: '/profile', component: Profile, name: 'profile'}
];

const router = new VueRouter({
	routes
});

router.beforeResolve((to, from, next) => {
	if (to.name) {
		NProgress.start();
	}
	next()
});

router.afterEach(() => {
	NProgress.done();
});

export default router;