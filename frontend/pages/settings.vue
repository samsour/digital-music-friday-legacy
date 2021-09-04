<template>
	<div>
		<h1>Settings</h1>
		<div>authorizationCode: {{ authorizationCode }}</div>
		<div>isAuthenticated: {{ isAuthenticated }}</div>
		<div>accessToken: {{ accessToken }}</div>
		<div>refreshToken: {{ refreshToken }}</div>
		<div>tokenExpirationEpoch: {{ tokenExpirationEpoch }}</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data: () => ({}),
	computed: {
		...mapState('user', [
			'authorizationCode',
			'isAuthenticated',
			'accessToken',
			'refreshToken',
			'tokenExpirationEpoch',
		]),
	},
	methods: {},
};
</script>
