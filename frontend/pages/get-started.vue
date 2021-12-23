<template>
	<div>
		<h1>Get Started!</h1>
		<p>Step 1 blabla</p>
		<p>Step 2 blabla</p>
		<p>Step 3 blabla</p>
		<a :href="loginUrl">Login with spotify</a>
	</div>
</template>

<script>
export default {
	data: () => ({
		loginUrl: process.env.API_URL + '/authorize',
	}),
};
</script>
