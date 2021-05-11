require('dotenv').config();
var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

var app = express();
app.set('port', process.env.PORT || 8080);

var scopes = ['user-read-private', 'user-read-email'],
	redirectUri = process.env.REDIRECT_URI,
	clientId = process.env.CLIENT_ID,
	state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
	redirectUri: redirectUri,
	clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

app.get('/', function (req, res) {
	res.send(authorizeURL);
});

app.get('/authorize', function (req, res) {
	res.redirect(authorizeURL);
});

app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`);
});
