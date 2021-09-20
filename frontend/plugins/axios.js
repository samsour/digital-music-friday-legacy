export default function ({ $axios, store }) {
	$axios.onRequest((config) => {
		config.headers.common['Content-Type'] = 'application/json';
		config.headers.common.Authorization =
			'Bearer ' + store.state.user.accessToken;
	});
}
