<template>
  <div id="app">
    <Header v-if="isUserLogged"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from 'src/components/main/header';
export default {
	name: 'app',
	components: {
		Header
    },
    computed: {
		isUserLogged() {
			return this.$store.getters.isLogged;
		}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
