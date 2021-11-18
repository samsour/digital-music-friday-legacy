import request from './request';

export default {
	getUserAuthURL: () => request.get('login'),

	refreshToken: (refresh_token) =>
		request.get(`refresh_token?refresh_token=${refresh_token}`),
};
