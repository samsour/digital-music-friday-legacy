const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);

const { Nuxt, Builder } = require('nuxt');
// We instantiate Nuxt with the options
const config = require('./nuxt.config.js');
config.dev = !isProd;

const nuxt = new Nuxt(config);
// Start build process in dev mode
if (config.dev) {
	const builder = new Builder(nuxt);
	builder.build();
}
app.use(nuxt.render);

// Listen the server
server.listen(port, '0.0.0.0');
console.log('Server listening on localhost:' + port); // eslint-disable-line no-console

// Socket.io

// Blueprints
const defaultRoom = {
	users: [],
	playlist: [],
	currentState: {},
	messages: [],
};

// Listening rooms
const rooms = new Map();

// TODO Refactor
const messages = [];

const newMessage = (text, date, author) => ({
	text: text.trim(),
	date: date ?? new Date().toJSON(),
	author: author ?? 'Server',
});

io.on('connection', (socket) => {
	socket.on('join-room', (roomId) => handleJoinRoom(socket, roomId));

	socket.on('fetch-last-messages', (callback) => {
		console.log(socket.rooms);
		callback(messages.slice(-50));
	});

	socket.on('send-message', ({ date, text }) => {
		const message = newMessage(text, date, socket.username);
		messages.push(message);
		socket.broadcast.emit('new-message', message);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

io.use((socket, next) => {
	const username = socket.handshake.auth.username;
	if (!username) {
		return next(new Error('invalid username'));
	}
	socket.username = username;
	next();
});

const handleJoinRoom = (socket, roomId) => {
	socket.join(roomId);
	const room = rooms.get(roomId) ?? defaultRoom;
	room.users.push(socket);
	rooms.set(roomId, room);

	console.log(rooms);

	io.to(roomId).emit(
		'new-message',
		newMessage(`${socket.username} has joined the room.`),
	);
	console.log(`User ${socket.username} has joined ${roomId}`);
};
