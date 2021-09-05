import axios from 'axios';

export const spotify = (endpoint, token) => {
	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	};

	return new Promise((resolve, reject) => {
		axios
			.get(`${process.env.SPOTIFY_API}${endpoint}`, config)
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});
};
