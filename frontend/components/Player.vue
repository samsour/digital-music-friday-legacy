<template>
	<div>
		<script src="https://sdk.scdn.co/spotify-player.js"></script>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	mounted() {
		this.initializeWebPlayer();
	},
	async fetch() {
		// await this.authorize();
	},
	methods: {
		initializeWebPlayer() {
			window.onSpotifyWebPlaybackSDKReady = () => {
				const token = process.env.webAPIAccessToken;
				console.log(token);
				const player = new window.Spotify.Player({
					name: 'Web Playback SDK Quick Start Player',
					getOAuthToken: (cb) => {
						cb(token);
					}
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
							redirect_uri: 'http://localhost:3000/'
							// state: '',// TODO: e.g., a hash of the session cookie used to authenticate the user-agent
						}
					}
				);
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		}
	}
};
</script>
