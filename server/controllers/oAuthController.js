	async function askUserPermission () {
		passport.authenticate('google', { scope: ['profile', 'email'] });
	} 
	
	// FIX react nativ works with url path?
  //FIX: figure out what the client does with this response or if this is in right format
	async function handleUserPermission () {
		passport.authenticate('google', { 
			failureRedirect: '/loginFailed',
			failureFlash: true }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/'); //FIX where exacly we can go homeScreen?
	};
}
  
  function loginFailed (req, res) {
    try {
      res.status(401);
      res.failedLogin = true;
      // res.send('loginFailed');
    } catch (err) {
      console.error(`Error at ${path.basename(__dirname)}/${path.basename(__filename)} ${err}`);
      res.sendstatus(500);
    }
  }
	
	module.exports = {
		askUserPermission,
		handleUserPermission,
		loginFailed
	}