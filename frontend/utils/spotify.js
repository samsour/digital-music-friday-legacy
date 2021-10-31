export const uriToUrl = (uri) => {
	if (uri && uri.length > 0) {
		const args = uri.replace('spotify:', '').split(':');
		return `https://open.spotify.com/${args.join('/')}`;
	}
};
