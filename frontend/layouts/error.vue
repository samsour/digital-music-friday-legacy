<template>
	<div>
		<h1 v-if="error.statusCode === 404">{{ error.message }}</h1>
		<h1 v-else>An error occurred</h1>
		<NuxtLink to="/">Home page</NuxtLink>
	</div>
</template>

<script>
export default {
	layout: 'error',
	props: {
		error: {
			type: Object,
			default: () => ({ message: 'Page not found', statusCode: 404 })
		}
	}
};
</script>
