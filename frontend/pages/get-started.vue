<template>
	<div>Get Started!</div>
</template>

<script>
export default {
	data: () => ({
		loginUrl: process.env.API_URL + '/authorize',
	}),
};
</script>
