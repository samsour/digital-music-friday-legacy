<template>
	<div
		:class="{
			player: true,
			'is-detached': $route.name !== 'listen-id',
		}"
	>
		<!-- <button v-if="connected" type="button" @click="disconnectPlayer">
			Disconnect {{ deviceId }}
		</button> -->
		<!-- <button v-else type="button" @click="connectPlayer">Connect</button> -->
		<!-- <button type="button" @click="fetchPlayerState">
			Fetch player state
		</button> -->
		<div class="player__current-track">
			<div class="player__album">
				<img class="player__album-image" :src="albumCoverSrc" />
				{{ albumCoverImages }}
			</div>

			<div class="player__track-info">
				<span class="player__track-name">{{ songName }}</span>
				<div class="player__track-artists">
					<span v-for="artist in songArtists" :key="artist">
						{{ artist.name }}
					</span>
				</div>
			</div>
		</div>
		<div class="player__volume"></div>
		<!-- <input
			v-model="volume"
			type="range"
			min="0"
			max="100"
			@input="updateVolume"
		/> -->
		<button v-if="paused" type="button" @click="play">Play</button>
		<button v-else type="button" @click="pause">Pause</button>
	</div>
</template>

<script>
import { mapState } from 'vuex';

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
		albumCoverSrc() {
			return this.currentTrack?.album?.images[0]?.url;
		},
		songName() {
			return this.currentTrack?.name;
		},
		songArtists() {
			return this.currentTrack?.artists;
		},
		...mapState('user', ['accessToken']),
		...mapState('player', [
			'player',
			'deviceId',
			'connected',
			'currentTrack',
			'paused',
		]),
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
		pause() {
			this.player.pause().then(() => {
				console.log('Paused!');
			});
		},
	},
};
</script>
<style scoped>
.player {
	--player-height: 5em;
	--player-border-radius: calc(var(--player-height) / 2);

	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: var(--player-height);
	border-top-left-radius: var(--player-border-radius);
	border-top-right-radius: var(--player-border-radius);
	background: var(--color-accent-secondary);
	display: flex;
	justify-content: space-between;
	padding: 0 var(--spacing-sides);
}

.player__current-track {
	display: flex;
}

.player__track-info {
}

.player__album-image {
	--image-size: 3.5rem;

	width: var(--image-size);
	height: var(--image-size);
}
</style>
