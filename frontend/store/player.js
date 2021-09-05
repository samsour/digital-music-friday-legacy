export const state = () => ({
	player: null,
	message: '',
	connected: false,
	deviceId: null,
});

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
			if (!playerState) {
				commit('setMessage', 'There is no music playing.');
				return;
			}

			const {
				current_track: currentTrack,
				next_tracks: [nextTrack],
			} = playerState.track_window;

			console.log(currentTrack);
			console.log(nextTrack);

			commit(
				'setMessage',
				`Currently Playing ${currentTrack.name}. Playing Next: ${nextTrack.name}`,
			);
		});
	},
	registerEventListener({ state, commit }) {
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

		// // Playback status updates
		// state.player.addListener('player_state_changed', (state) => {});

		// Ready
		commit('SET_EVENT_LISTENER', {
			name: 'ready',
			callback: ({ device_id: deviceId }) => {
				commit('SET_CONNECTED', true);
				commit('SET_DEVICE_ID', deviceId);
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
};
