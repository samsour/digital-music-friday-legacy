<template>
	<div>
		<script src=""></script>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Player',
	head() {
		return {
			script: [
				{
					src: 'https://sdk.scdn.co/spotify-player.js',
					body: true,
				},
			],
		};
	},
	computed: {
		authorizationCode() {
			return this.$store.state.user.authorizationCode;
		},
	},
	mounted() {
		this.initializeWebPlayer();
	},
	methods: {
		initializeWebPlayer() {
			window.onSpotifyWebPlaybackSDKReady = () => {
				const token = 'asdf';
				const player = new window.Spotify.Player({
					name: 'Digital Music Friday Player',
					getOAuthToken: (callback) => {
						// Run code to get a fresh access token
						callback(token);
					},
					volume: 0.5,
				});

				// Error handling
				player.addListener('initialization_error', ({ message }) => {
					console.error(message);
				});
				player.addListener('authentication_error', ({ message }) => {
					console.error(message);
				});
				player.addListener('account_error', ({ message }) => {
					console.error(message);
				});
				player.addListener('playback_error', ({ message }) => {
					console.error(message);
				});

				// Playback status updates
				player.addListener('player_state_changed', (state) => {
					console.log(state);
				});

				// Ready
				player.addListener('ready', ({ device_id: deviceId }) => {
					console.log('Ready with Device ID', deviceId);
				});

				// Not Ready
				player.addListener('not_ready', ({ device_id: deviceId }) => {
					console.log('Device ID has gone offline', deviceId);
				});

				// Connect to the player!
				player.connect();
			};
		},
		async authorize() {
			try {
				const response = await axios.get(
					process.env.serviceUrl + '/authorize',
					{
						params: {
							client_id: process.env.clientID,
							response_type: 'token',
							redirect_uri: 'http://localhost:3000/',
							// state: '',// TODO: e.g., a hash of the session cookie used to authenticate the user-agent
						},
					},
				);
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
