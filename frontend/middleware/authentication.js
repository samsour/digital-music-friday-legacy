export default function ({ store, redirect, from }) {
	// If the user is not authenticated
	if (!store.state.user?.isAuthenticated) {
		// Save room Id in local storage for redirect
		const roomId = from.params.id;
		if (roomId) {
			localStorage.roomId = roomId;
		}
		return redirect(process.env.API_URL + '/authorize');
	}
}
