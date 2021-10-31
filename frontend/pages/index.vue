<template>
	<div class="container">
		<h1 class="title">digital-music-friday</h1>
		<div class="links">
			<NuxtLink to="/listen">Listen now!</NuxtLink>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	head: {
		title: 'Spotify Music Friday',
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

:root {
	/** TODO: auto generate color values */
	--spindle: #c9d9ee;
	--ship-cove: #7f98bb;
	--river-bed: #3f4a59;
	--color-accent: var(--ship-cove);
	--color-accent-primary: var(--river-bed);
	--color-accent-secondary: var(--spindle);
	--color-theme-primary: #fff;
	--color-theme-secondary: #f7f7f7;
	--color-theme-static-grey: #2a2a2a;
	--color-theme-error: #e08888;
	--spacing-sides: 2rem;
	--font-primary: 'Nunito', sans-serif;
	--box-shadow-primary: 0 10px 10px rgba(0, 0, 0, 0.1);
	--box-shadow-primary--hover: 0 0 10px rgba(0, 0, 0, 0.1);
	--box-shadow-primary--transition: 0.15s all ease-in-out;
	--box-padding-primary: 1rem;
	--border-radius-primary: 1rem;
}

@media (prefers-color-scheme: dark) {
	:root {
		/** TODO: auto generate color values */
		--color-accent: var(--ship-cove);
		--color-accent-primary: var(--spindle);
		--color-accent-secondary: var(--river-bed);
		--color-theme-primary: #32383e;
		--color-theme-secondary: #1f2021;
		--color-theme-static-grey: #2a2a2a;
		--color-theme-error: #e08888;
	}
}

body {
	font-family: var(--font-primary);
	font-weight: 600;
	letter-spacing: -0.35px;
	color: var(--color-accent-primary);
	background: var(--color-theme-secondary);
}
</style>
