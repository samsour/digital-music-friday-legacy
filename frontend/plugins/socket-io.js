import io from 'socket.io-client';
const socket = io(process.env.WEBSOCKET_URL);

export default socket;