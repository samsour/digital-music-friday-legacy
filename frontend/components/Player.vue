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
			<a
				:href="albumUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="player__album"
			>
				<img
					class="player__album-image"
					:alt="songName"
					:title="songName"
					:src="albumCoverSrc"
				/>
			</a>

			<div class="player__track-info">
				<span class="player__track-name">{{ songName }}</span>
				<div class="player__track-artists">
					<a
						v-for="artist in songArtists"
						:key="artist.name"
						class="player__track-artist"
						:href="uriToUrl(artist.uri)"
						target="_blank"
						rel="noopener noreferrer"
						>{{ artist.name }}</a
					>
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
		<custom-button v-if="paused" type="button" @click="play"
			><Play
		/></custom-button>
		<custom-button v-else type="button" @click="pause"
			><Pause
		/></custom-button>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { uriToUrl } from '../utils/spotify';

import CustomButton from './CustomButton.vue';
import Play from './icons/Play.vue';
import Pause from './icons/Pause.vue';

export default {
	name: 'Player',
	components: { CustomButton, Play, Pause },
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
		albumUrl() {
			console.log(this.currentTrack);
			return uriToUrl(this.currentTrack?.album?.uri);
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
		uriToUrl(uri) {
			return uriToUrl(uri);
		},
	},
};
</script>
<style lang="scss" scoped>
.player {
	--player-height: 90px;
	--player-border-radius: calc(var(--player-height) / 2);
	--album-size: 55px;

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
	align-items: center;
	padding: 0 var(--spacing-sides);
}

.player__current-track {
	display: flex;
	align-items: center;
}

.player__album {
	display: block;
	position: relative;
	margin-right: 1rem;
	height: var(--album-size);
	border-radius: 50%;
	overflow: hidden;
	border: 1px solid var(--color-theme-primary);
	box-shadow: var(--box-shadow-primary);
	transition: var(--box-shadow-primary--transition);

	&:hover {
		box-shadow: var(--box-shadow-primary--hover);
	}
}

.player__album-image {
	width: var(--album-size);
	height: var(--album-size);
}

.player__track-artist {
	color: var(--color-accent);
	font-size: 13px;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
		color: var(--color-accent-primary);
	}

	&:not(:last-child) {
		margin-right: 0.5em;

		&::after {
			content: ',';
		}
	}
}
</style>
