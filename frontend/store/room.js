export const state = () => ({
	id: null,
	user: [],
	currentSong: null,
	playlist: [],
});

export const mutations = {
	SET_ID(state, id) {
		state.id = id;
	},
};

export const actions = {
	setId({ commit }, id) {
		commit('SET_ID', id);
		localStorage.removeItem('roomId');
	},
};
