import { uriToUrl } from '../utils/spotify';

export const state = () => ({
	player: null,
	message: '',
	connected: false,
	deviceId: null,
	loading: false,
	paused: false,
	duration: 0,
	timestamp: 0,
	position: 0,
	shuffle: false,
	currentTrack: null,
	nextTracks: [],
	previousTracks: [],
	info: '',
	uri: '',
});

export const getters = {
	songName: (state) => {
		return state.currentTrack?.name;
	},
	songArtists: (state) => {
		return state.currentTrack?.artists.map((artist) => {
			artist.url = uriToUrl(artist.uri);
			return artist;
		});
	},
	albumCover: (state) => {
		return state.currentTrack?.album?.images[0]?.url;
	},
	albumUrl: (state) => {
		return uriToUrl(state.currentTrack?.album?.uri);
	},
};

export const mutations = {
	setPlayer(state, player) {
		state.player = player;
	},
	setMessage(state, message) {
		state.message = message;
	},
	SET_CONNECTED(state, connected) {
		state.connected = connected;
	},
	SET_DEVICE_ID(state, deviceId) {
		state.deviceId = deviceId;
	},
	SET_PLAYER_STATE(
		state,
		{
			paused,
			duration,
			timestamp,
			position,
			shuffle,
			track_window: trackWindow,
			info,
			uri,
		},
	) {
		state.paused = paused;
		state.duration = duration;
		state.timestamp = timestamp;
		state.position = position;
		state.shuffle = shuffle;
		state.shuffle = shuffle;
		state.currentTrack = trackWindow.current_track;
		state.nextTracks = trackWindow.next_tracks;
		state.previousTracks = trackWindow.previous_tracks;
		state.info = info;
		state.uri = uri;
	},
	SET_EVENT_LISTENER(state, { name, callback }) {
		state.player.addListener(name, (args) => callback(args));
	},
};

export const actions = {
	init({ rootState, commit }, { name, volume }) {
		commit(
			'setPlayer',
			new window.Spotify.Player({
				name,
				getOAuthToken: (callback) => {
					callback(rootState.user.accessToken);
				},
				volume,
			}),
		);
	},
	async fetchPlayerState({ state, commit }) {
		await state.player.getCurrentState().then((playerState) => {
			commit('SET_PLAYER_STATE', playerState);
		});
	},
	registerEventListener({ state, commit, dispatch }) {
		// // Error handling
		// state.player.addListener('initialization_error', ({ message }) => {
		// 	console.error(message);
		// });
		// state.player.addListener('authentication_error', ({ message }) => {
		// 	console.error(message);
		// });
		// state.player.addListener('account_error', ({ message }) => {
		// 	console.error(message);
		// });
		// state.player.addListener('playback_error', ({ message }) => {
		// 	console.error('playback error', message);
		// });
		// Ready
		commit('SET_EVENT_LISTENER', {
			name: 'player_state_changed',
			callback: (playerState) => {
				commit('SET_PLAYER_STATE', playerState);
			},
		});

		// Ready
		commit('SET_EVENT_LISTENER', {
			name: 'ready',
			callback: ({ device_id: deviceId }) => {
				commit('SET_CONNECTED', true);
				commit('SET_DEVICE_ID', deviceId);
				dispatch('activatePlayer');
			},
		});

		// Not Ready
		commit('SET_EVENT_LISTENER', {
			name: 'not_ready',
			callback: ({ device_id: deviceId }) => {
				commit('SET_CONNECTED', false);
				commit('SET_DEVICE_ID', deviceId);
				commit('setMessage', 'Device ID has gone offline');
			},
		});
	},
	async activatePlayer({ state }) {
		await this.$axios.$put(`me/player`, {
			device_ids: [state.deviceId],
			play: true,
		});
	},
};
