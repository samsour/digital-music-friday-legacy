import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
	createPersistedState({
		key: 'spotify_state',
		reducer: (state) => ({
			auth: state.auth,
		}),
	})(store);
};
