import axios from 'axios';

export const state = () => ({
	authorizationCode: null,
	isAuthenticated: false,
	accessToken: null,
	refreshToken: null,
	tokenExpirationEpoch: null,
});

export const mutations = {
	setAuthorizationCode(state, code) {
		state.authorizationCode = code;
		state.isAuthenticated = true;
	},
	reset(state) {
		state.isAuthenticated = false;
		state.accessToken = null;
		state.refreshToken = null;
		state.tokenExpirationEpoch = null;
	},
	setAccessToken(state, { accessToken, refreshToken, tokenExpirationEpoch }) {
		state.accessToken = accessToken;
		state.refreshToken = refreshToken;
		state.tokenExpirationEpoch = tokenExpirationEpoch;
	},
};

export const actions = {
	fetchAccessToken({ state, commit }) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.apiUrl}/token`, {
					authorizationCode: state.authorizationCode,
				})
				.then((response) => {
					const {
						accessToken,
						refreshToken,
						tokenExpirationEpoch,
					} = response.data;

					commit('setAccessToken', {
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
};
