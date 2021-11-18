<template>
	<div>
		<div class="chatArea">
			<ul ref="messages" class="messages">
				<li
					v-for="(message, index) in messages"
					:key="index"
					class="message"
				>
					<i :title="message.date">
						{{ message.date.split('T')[1].slice(0, -2) }}
					</i>
					<i :title="message.author">
						{{ message.author }}
					</i>
					: {{ message.text }}
				</li>
			</ul>
		</div>
		<input
			v-model="messageInput"
			class="inputMessage"
			type="text"
			placeholder="Type here..."
			@keyup.enter="sendMessage"
		/>
	</div>
</template>

<script>
import socket from '~/plugins/socket-io.js';

export default {
	data: () => ({
		messageInput: '',
		messages: [],
	}),
	fetch() {
		socket.emit(
			'fetch-last-messages',
			(messages) => (this.messages = messages),
		);
	},
	computed: {
		name() {
			return this.$store.state.user.name;
		},
	},
	watch: {
		messages: 'scrollToBottom',
	},
	beforeMount() {
		socket.on('new-message', (message) => {
			this.messages.push(message);
		});
	},
	mounted() {
		this.scrollToBottom();
	},
	methods: {
		sendMessage() {
			if (!this.messageInput.trim()) {
				return;
			}
			const message = {
				date: new Date().toJSON(),
				text: this.messageInput.trim(),
				author: this.name,
			};
			this.messages.push(message);
			this.messageInput = '';
			socket.emit('send-message', message);
		},
		scrollToBottom() {
			this.$nextTick(() => {
				this.$refs.messages.scrollTop =
					this.$refs.messages.scrollHeight;
			});
		},
	},
};
</script>

<style>
.messages {
	height: 100%;
	margin: 0;
	overflow-y: scroll;
	padding: 0.75rem 1.5rem;
}
</style>
