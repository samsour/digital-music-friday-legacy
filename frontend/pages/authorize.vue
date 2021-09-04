<template>
	<div>
		<h1>Authorize</h1>
		<div v-if="isLoading">Loading...</div>
		<div>{{ message }}</div>
		<div>Room ID: {{ roomId }}</div>
	</div>
</template>

<script>
export default {
	beforeRouteEnter(to, from, next) {
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		if (to.query.code) {
			next();
		} else {
			next(from);
		}
	},
	data: () => ({
		isLoading: true,
		message: '',
	}),
	computed: {
		accessToken() {
			return this.$store.state.user.accessToken;
		},
		roomId() {
			return this.$store.state.room.id;
		},
	},
	created() {
		if (localStorage.roomId) {
			this.$store.dispatch('room/setId', localStorage.roomId);
		}

		this.processAuthorizationCode();
	},
	methods: {
		processAuthorizationCode() {
			const { code: authorizationCode } = this.$route.query;

			if (authorizationCode) {
				this.$router.replace({ query: {} });
				this.message = 'Processing your Spotify authorization code.';
				this.$store.commit(
					'user/setAuthorizationCode',
					authorizationCode,
				);

				this.message = 'Fetching your Spotify access token.';
				this.$store
					.dispatch('user/fetchAccessToken', authorizationCode)
					.then(() => {
						this.isLoading = false;
						this.message =
							'You are now logged in with your Spotify Account.';
						this.$store.dispatch('user/fetchtAccountData');
						this.$router.push(`/welcome`);
					});
			} else {
				this.isLoading = false;
				this.message =
					'There has been an error contacting the Spotify API.';
				console.error(
					'processAuthorizationCode: No authorizationCode submitted.',
				);
			}
		},
	},
};
</script>
