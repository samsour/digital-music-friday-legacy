<template>
	<div class="container">
		<h1 class="title">digital-music-friday</h1>
		<div class="links">
			<NuxtLink to="/listen">Listen now!</NuxtLink>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	head: {
		title: 'Spotify Music Friday',
	},
};
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
		BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif;
	display: block;
	font-weight: 300;
	font-size: 5rem;
	color: #35495e;
	letter-spacing: 0.125rem;
}

.subtitle {
	font-weight: 300;
	font-size: 3rem;
	color: #526488;
	word-spacing: 0.25rem;
	padding-bottom: 1rem;
}

.links {
	padding-top: 1rem;
}

a {
	text-decoration: underline;
}
button {
	background: #ccc;
}
</style>
