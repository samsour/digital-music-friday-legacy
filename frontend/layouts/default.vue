<template>
	<div>
		<NuxtLink to="/">Home</NuxtLink>
		<NuxtLink to="/settings">Settings</NuxtLink>
		<NuxtLink :to="{ path: 'listen', params: { id: 'qwer' } }"
			>Join room qwer</NuxtLink
		>
		<Nuxt />
	</div>
</template>

<style>
html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 1rem;
	word-spacing: 0.125rem;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
}

.button--green {
	display: inline-block;
	border-radius: 0.25rem;
	border: 0.075rem solid #3b8070;
	color: #3b8070;
	text-decoration: none;
	padding: 1rem 2rem;
}

.button--green:hover {
	color: #fff;
	background-color: #3b8070;
}
</style>
