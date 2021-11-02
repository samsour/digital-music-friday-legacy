<template>
	<section class="headed-section">
		<div class="headed-section__title-container">
			<h2 class="headed-section__title">{{ title }}</h2>
		</div>
		<div class="headed-section__content">
			<slot />
		</div>
	</section>
</template>

<script>
export default {
	name: 'HeadedSection',
	props: {
		title: {
			type: String,
			default: '',
		},
	},
};
</script>

<style>
.headed-section {
	display: flex;
	width: 100%;
	padding-right: var(--spacing-sides);
}

.headed-section__title-container {
	width: var(--spacing-sides);
}

.headed-section__title {
	width: 100vw;
	transform: rotate(-90deg);
	text-align: right;
	font-size: 1rem;
	white-space: nowrap;
	transform-origin: bottom;
}
</style>
