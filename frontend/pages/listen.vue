<template>
	<div>
		<h1>Listen</h1>
		<Player />
		<input
			v-model="value"
			type="text"
			placeholder="Search"
			@keyup.enter="search"
		/>
		<button type="button" @click="search">Submit</button>
		<div v-if="items.length > 0">
			<div v-for="item in items" :key="item.id">
				<h2>{{ item.name }}</h2>
				<img
					v-if="item.images && item.images[0]"
					:src="item.images[0].url"
				/>
			</div>
		</div>
		<div v-else>No Results / Search something</div>
	</div>
</template>

<script>
import axios from 'axios';
import Player from '../components/Player.vue';

export default {
	components: { Player },
	// User needs to be logged in since this is a restricted page
	middleware: 'authentication',
	data: () => ({
		value: '',
		items: [],
	}),
	methods: {
		search() {
			console.log('Searching for Artist...');
			axios
				.get(`${process.env.API_URL}/searchArtists?q=${this.value}`)
				.then((response) => {
					console.log(response?.data);
					const { items } = response.data?.artists ?? response.data;
					this.items = items;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
