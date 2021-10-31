<template>
	<div>
		<h1>Listening to {{ roomId }}</h1>
		<Search />
		<Chat />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Chat from '~/components/Chat.vue';
import Search from '~/components/Search.vue';
import socket from '~/plugins/socket-io.js';

export default {
	components: { Chat, Search },
	// User needs to be logged in since this is a restricted page
	middleware: 'authentication',
	data: () => ({
		currentSong: null,
		queue: [],
		users: [],
	}),
	fetch() {
		socket.auth = { username: this.name };
		socket.connect();
		socket.emit('join-room', this.roomId);

		socket.on('connect_error', (err) => {
			if (err.message === 'invalid username') {
				this.usernameAlreadySelected = false;
			}
		});
	},
	computed: {
		...mapState('user', ['id', 'name']),
		roomId() {
			return this.$store.state.room.id;
		},
	},
	watch: {
		'$route.query': '$fetch',
	},
	destroyed() {
		socket.off('connect_error');
	},
};
</script>
