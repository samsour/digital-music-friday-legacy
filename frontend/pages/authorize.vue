<template>
	<div>Hello User!</div>
</template>

<script>
export default {
	data: () => ({
		waitForSeconds: 5
	}),
	computed: {
		authorizationCode() {
			return this.$store.state.user.authorizationCode;
		}
	},
	mounted() {
		setTimeout(
			() => this.$router.push('/home'),
			this.waitForSeconds * 1000
		);
	}
};
</script>
