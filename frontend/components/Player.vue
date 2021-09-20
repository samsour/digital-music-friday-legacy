<template>
	<div>
		<h2>Player</h2>
		<button v-if="connected" type="button" @click="disconnectPlayer">
			Disconnect {{ deviceId }}
		</button>
		<button v-else type="button" @click="connectPlayer">Connect</button>
		<button type="button" @click="fetchPlayerState">
			Fetch player state
		</button>
		Volume:
		<input
			type="range"
			min="0"
			max="100"
			@input="updateVolume"
			v-model="volume"
		/>
		<button type="button" @click="play">Play</button>
		{{ message }}
	</div>
</template>

<script>
export default {
	name: 'Player',
	data: () => ({
		playerName: 'Digital Music Friday Player',
		volume: 50,
	}),
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
		volumePercentage() {
			return parseInt(this.volume) / 100;
		},
		accessToken() {
			return this.$store.state.user.accessToken;
		},
		message() {
			return this.$store.state.player.message;
		},
		player() {
			return this.$store.state.player.player;
		},
		deviceId() {
			return this.$store.state.player.deviceId;
		},
		connected() {
			return this.$store.state.player.connected;
		},
	},
	mounted() {
		this.initializeWebPlayer();
	},
	methods: {
		initializeWebPlayer() {
			window.onSpotifyWebPlaybackSDKReady = () => {
				this.$store.dispatch('player/init', {
					name: this.playerName,
					volume: this.volumePercentage,
				});

				this.$store.dispatch('player/registerEventListener');

				// Connect to the player!
				this.connectPlayer();
			};
		},
		connectPlayer() {
			this.player.connect();
		},
		disconnectPlayer() {
			this.player.disconnect();
			this.$store.commit('player/SET_CONNECTED', false);
		},
		fetchPlayerState() {
			this.$store.dispatch('player/fetchPlayerState');
		},
		updateVolume() {
			this.player.setVolume(this.volumePercentage).then(() => {
				console.log('Volume updated!');
			});
		},
		play() {
			this.player.resume().then(() => {
				console.log('Resumed!');
			});
		},
	},
};
</script>
