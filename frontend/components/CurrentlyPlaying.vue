<template>
	<HeadedSection title="Currently playing">
		<div class="currently-playing__album-cover">
			<img :src="albumCover" :alt="songName" :title="songName" />
		</div>
		<div class="currently-playing__provider">
			<Spotify class="currently-playing__provider-icon" />
		</div>
	</HeadedSection>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Spotify from './icons/Spotify.vue';
import HeadedSection from './HeadedSection.vue';

export default {
	name: 'CurrentlyPlaying',
	components: { Spotify, HeadedSection },
	computed: {
		...mapState('player', [
			'player',
			'deviceId',
			'connected',
			'currentTrack',
			'paused',
		]),
		...mapGetters('player', ['albumCover', 'songName', 'songArtists']),
	},
};
</script>

<style lang="scss">
.currently-playing__album-cover {
}

.currently-playing__provider {
	display: flex;
	justify-content: flex-end;
}

.currently-playing__provider-icon {
	display: block;
	width: 60px;
	height: 20px;
}
</style>
