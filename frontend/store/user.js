import axios from 'axios';

export const state = () => ({
	isAuthenticated: false,
	accessToken: null,
	refreshToken: null,
	tokenExpirationEpoch: null,
	id: '',
	name: 'Spotify User',
	hasSpotifyPremium: false,
	spotifyName: '',
	spotifyUrl: undefined,
	spotifyImages: [],
	spotifyFollowerCount: undefined,
});

export const mutations = {
	SET_TOKENS(state, { accessToken, refreshToken, tokenExpirationEpoch }) {
		state.accessToken = accessToken;
		state.refreshToken = refreshToken;
		state.tokenExpirationEpoch = tokenExpirationEpoch;
	},
	SET_NAME(state, name) {
		state.name = name;
	},
	SET_USER_DATA(state, data) {
		state.id = data.id;
		state.spotifyName = data.display_name;
		state.name = data.display_name;
		state.spotifyUrl = data.external_urls?.spotify;
		state.spotifyImages = data.images;
		state.hasSpotifyPremium = data.product === 'premium';
		state.spotifyFollowerCount = data.followers?.total;
	},
};

export const actions = {
	fetchAccessToken({ state, commit }) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.API_URL}/token`, {
					authorizationCode: state.authorizationCode,
				})
				.then((response) => {
					const { accessToken, refreshToken, tokenExpirationEpoch } =
						response.data;

					commit('SET_TOKENS', {
						accessToken,
						refreshToken,
						tokenExpirationEpoch,
					});
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	async fetchSpotifyUser({ commit }) {
		const data = await this.$axios.$get(`/me`);
		commit('SET_USER_DATA', data);
	},
};
