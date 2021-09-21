<template>
	<div>
		<h1>Welcome</h1>
		<input type="text" v-model="name" />
		<nuxt-link :to="{ name: 'listen-id', params: { id: roomId } }"
			>Join {{ roomId }}</nuxt-link
		>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	middleware: 'authentication',
	computed: {
		...mapState('user', ['id', 'spotifyImages']),
		name: {
			set(name) {
				this.$store.commit('user/SET_NAME', name);
			},
			get() {
				return this.$store.state.user.name;
			},
		},
		roomId() {
			return this.$store.state.room.id;
		},
	},
	created() {},
	methods: {
		continue() {
			const room = this.roomId ?? this.getRandomString(6);
			this.$router.push(`/listen/${room}`);
		},
		getRandomString(length) {
			return Math.random()
				.toString(36)
				.replace(/[^a-z]+/g, '')
				.substr(0, length ?? 5);
		},
	},
};
</script>
