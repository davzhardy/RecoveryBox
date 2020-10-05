
	async function askUserPermission () {
		passport.authenticate('google', { scope: ['profile', 'email'] });
	}

	async function handleUserPermission () {
		passport.authenticate('google', { failureRedirect: '/login' }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/'); //FIX where exacly we can go?
		}
	};
	
	module.exports = {
		askUserPermission,
		handleUserPermission
	}