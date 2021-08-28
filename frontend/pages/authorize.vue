<template>
	<div>
		<h1>Authorize</h1>
		<div>Your authorizationCode: {{ authorizationCode }}</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	computed: {
		authorizationCode() {
			return this.$store.state.user.authorizationCode;
		},
	},
	created() {
		this.processAuthorizationCode();

		if (this.authorizationCode) {
			this.fetchAccessToken();
		}
	},
	methods: {
		processAuthorizationCode() {
			const { code } = this.$route.query;

			if (code) {
				this.$store.commit('user/setAuthCode', code);
			} else {
				console.error(
					'processAuthorizationCode: No authorizationCode submitted.',
				);
			}
		},
		fetchAccessToken() {
			axios
				.post(`${process.env.apiUrl}/token`, {
					authorizationCode: this.authorizationCode,
				})
				.then((response) => {
					this.$router.replace('/listen');
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
