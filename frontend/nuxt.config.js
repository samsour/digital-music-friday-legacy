module.exports = {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	telemetry: false,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'digital-music-friday',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/axios'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Router property -  https://nuxtjs.org/docs/2.x/features/file-system-routing#the-router-property
	router: {
		// middleware: ['authentication'],
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		['~/io'],
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
	],
	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: process.env.SPOTIFY_API || 'https://api.spotify.com/v1', // Used as fallback if no runtime config is provided
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en',
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	env: {
		BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
		API_URL: process.env.API_URL || 'http://localhost:4000',
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		SERVICE_URL: process.env.SERVICE_URL,
		WEBSOCKET_URL: process.env.WEBSOCKET_URL || 'http://localhost:3000',
		SPOTIFY_API: process.env.SPOTIFY_API || 'https://api.spotify.com/v1',
	},
};
