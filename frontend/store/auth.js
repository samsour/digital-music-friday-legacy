export const state = () => ({
	accessToken: '',
	refreshToken: '',
	expirationTime: '',
});

export const mutations = {
	SET_ACCESS_TOKEN(state, token) {
		state.accessToken = token;
	},

	SET_REFRESH_TOKEN(state, token) {
		state.refreshToken = token;
	},

	SET_EXPIRATION_TIME(state, time) {
		state.expiryTime = time;
	},
};

export const actions = {
	// TODO: implement function / replace with custom axios instance for auth api
	// async login() {
	// 	try {
	// 		const response = await api.auth.getUserAuthURL();
	// 		if (response.data) {
	// 			window.location.href = response.data;
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// },

	// TODO: implement functon
	// async refreshToken({ commit, state, dispatch }) {
	// 	try {
	// 		if (state.refreshToken) {
	// 			const response = await api.auth.refreshToken(
	// 				state.refreshToken,
	// 			);
	// 			commit('SET_ACCESS_TOKEN', response.data.access_token);

	// 			const accessToken = response.data.access_token;

	// 			dispatch('setAccessToken', accessToken);
	// 			return response;
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// },

	logout() {
		const script = document.createElement('script');
		script.src = 'https://www.spotify.com/logout/';
		document.getElementById('app').appendChild(script);
		window.localStorage.clear();
		window.sessionStorage.clear();

		setTimeout(() => {
			location.reload();
		}, 1000);
	},
};
