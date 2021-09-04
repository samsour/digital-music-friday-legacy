export default function ({ store, redirect, from }) {
	// If the user is not authenticated
	if (!store.state.user?.isAuthenticated) {
		localStorage.roomId = from.params.id;
		return redirect(process.env.API_URL + '/authorize');
	}
}
