<template>
	<div>
		<h1>Welcome</h1>
	</div>
</template>

<script>
export default {
	data: () => ({}),
	created() {},
	methods: {
		continue() {
			const room = this.roomId ?? this.getRandomString(6);
			console.log(room);
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
