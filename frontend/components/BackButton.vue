<template>
	<button @click="handleClick">Back to previous page</button>
</template>

<script>
export default {
	methods: {
		handleClick() {
			this.$router.go(-1);
		},
	},
};
</script>
