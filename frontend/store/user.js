export const state = () => ({
	authorizationCode: null,
	isAuthenticated: false,
});

export const mutations = {
	setAuthCode(state, code) {
		state.authorizationCode = code;
		state.isAuthenticated = true;
	},
	reset(state) {
		state.isAuthenticated = false;
		state.authorizationCode = null;
	},
};
