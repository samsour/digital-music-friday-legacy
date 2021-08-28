<template>
	<div class="container">
		<div>
			<h1 class="title">digital-music-friday</h1>
			<div class="links">
				<NuxtLink to="/listen">Listen now!</NuxtLink>
			</div>
		</div>
		<ul class="pages">
			<li class="chat page">
				<div class="chatArea">
					<ul ref="messages" class="messages">
						<li
							v-for="(msg, index) in messages"
							:key="index"
							class="message"
						>
							<i :title="msg.date">
								{{ msg.date.split('T')[1].slice(0, -2) }} </i
							>: {{ msg.text }}
						</li>
					</ul>
				</div>
				<input
					v-model="message"
					class="inputMessage"
					type="text"
					placeholder="Type here..."
					@keyup.enter="sendMessage"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import socket from '~/plugins/socket-io.js';

export default {
	name: 'Home',
	asyncData() {
		return new Promise((resolve) =>
			socket.emit('last-messages', (messages) => resolve({ messages })),
		);
	},
	data() {
		return { message: '' };
	},
	head: {
		title: 'Nuxt.js with Socket.io',
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
			if (!this.message.trim()) {
				return;
			}
			const message = {
				date: new Date().toJSON(),
				text: this.message.trim(),
			};
			this.messages.push(message);
			this.message = '';
			socket.emit('send-message', message);
		},
		scrollToBottom() {
			this.$nextTick(() => {
				this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
			});
		},
	},
};
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
		BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif;
	display: block;
	font-weight: 300;
	font-size: 5rem;
	color: #35495e;
	letter-spacing: 0.125rem;
}

.subtitle {
	font-weight: 300;
	font-size: 3rem;
	color: #526488;
	word-spacing: 0.25rem;
	padding-bottom: 1rem;
}

.links {
	padding-top: 1rem;
}

.messages {
	height: 100%;
	margin: 0;
	overflow-y: scroll;
	padding: 0.75rem 1.5rem;
}
</style>
