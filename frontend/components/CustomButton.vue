<template>
	<button @click="$emit('click')"><slot /></button>
</template>

<script>
export default {
	name: 'Button',
};
</script>

<style scoped>
button {
	border: 0;
	background: var(--color-theme-primary);
	color: var(--color-accent-primary);
	padding: var(--box-padding-primary);
	border-radius: var(--border-radius-primary);
	box-shadow: var(--box-shadow-primary);
	min-height: 50px;
	min-width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: var(--box-shadow-primary--transition);
}

button:hover {
	box-shadow: var(--box-shadow-primary--hover);
}

svg {
	stroke: var(--color-accent);
}
</style>
