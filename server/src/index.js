require('dotenv').config();
var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

var app = express();
app.set('port', process.env.PORT || 4000);

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_URL);

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type',
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(express.json());

const scopes = ['streaming', 'user-read-email', 'user-read-private'],
	redirectUri = process.env.REDIRECT_URI,
	clientId = process.env.CLIENT_ID,
	clientSecret = process.env.CLIENT_SECRET,
	state = 'yee-haa';
// state: '',// TODO: e.g., a hash of the session cookie used to authenticate the user-agent

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
	clientId,
	clientSecret,
	redirectUri,
});

// Create the authorization URL
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

app.get('/', function (req, res) {
	res.send(authorizeURL);
});

app.get('/authorize', function (req, res) {
	res.redirect(authorizeURL);
});

app.post('/token', function (req, res) {
	try {
		const { authorizationCode } = req.body;

		if (authorizationCode) {
			// When our access token will expire
			let tokenExpirationEpoch;

			// First retrieve an access token
			spotifyApi.authorizationCodeGrant(authorizationCode).then(
				function (data) {
					const accessToken = data.body['access_token'];
					const refreshToken = data.body['refresh_token'];

					// Set the access token and refresh token
					spotifyApi.setAccessToken(accessToken);
					spotifyApi.setRefreshToken(refreshToken);

					// Save the amount of seconds until the access token expired
					tokenExpirationEpoch =
						new Date().getTime() / 1000 + data.body['expires_in'];
					console.log(
						'Retrieved token. It expires in ' +
							Math.floor(
								tokenExpirationEpoch -
									new Date().getTime() / 1000,
							) +
							' seconds!',
					);
					res.json({
						accessToken,
						refreshToken,
						tokenExpirationEpoch,
					});
				},
				function (err) {
					console.log(
						'Something went wrong when retrieving the access token!',
						err.message,
					);
					res.sendStatus(200);
				},
			);
		}
	} catch (error) {
		res.sendStatus(400);
	}
});

app.post('/song', function (req, res) {
	// Get Elvis' albums
});

app.get('/getAlbums', (req, res) => {
	const { artistId } = req.query;

	if (artistId) {
		spotifyApi.getArtistAlbums(artistId).then(
			function (data) {
				res.json(data.body);
			},
			function (err) {
				res.json(err);
			},
		);
	}
});

app.get('/searchArtists', (req, res) => {
	const { q } = req.query;

	spotifyApi.searchArtists(q).then(
		function (data) {
			res.json(data.body);
		},
		function (err) {
			res.json(err);
		},
	);
});

app.get('*', function (req, res) {
	res.sendStatus(404);
});

app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`);
});
