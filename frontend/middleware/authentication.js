export default function ({ store, redirect, from }) {
	// If the user is not authenticated
	if (!store.state.user?.isAuthenticated) {
		return redirect(process.env.API_URL + '/authorize');
	}
}
