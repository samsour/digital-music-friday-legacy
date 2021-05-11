export const state = () => ({
	authorizationCode: null
});

export const mutations = {
	setAuthCode(state, code) {
		state.authorizationCode = code;
	},
	reset(state) {
		state.authorizationCode = null;
	}
};
