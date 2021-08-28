<template>
	<div>
		<h1>Authorize</h1>
		<div>Your authorizationCode: {{ authorizationCode }}</div>
	</div>
</template>

<script>
export default {
	computed: {
		authorizationCode() {
			return this.$store.state.user.authorizationCode;
		},
	},
	created() {
		this.processAuthorizationCode();

		if (this.authorizationCode) {
			this.$store
				.dispatch('user/fetchAccessToken', this.authorizationCode)
				.then(() => {
					this.$router.replace('/listen');
				});
		}
	},
	methods: {
		processAuthorizationCode() {
			const { code } = this.$route.query;

			if (code) {
				this.$store.commit('user/setAuthorizationCode', code);
			} else {
				console.error(
					'processAuthorizationCode: No authorizationCode submitted.',
				);
			}
		},
	},
};
</script>
