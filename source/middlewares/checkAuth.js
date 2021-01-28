// middleware for blocking access to routes
function checkAuth(req, res, next) {
	const authenticated = req.isAuthenticated();
	if (authenticated) {
		next();
	} else {
		// req.flash("warning", "You have to sign in before you can access this page");
		// res.redirect("/");
		res.status(401).send("<h3>401: Unauthorized</h3>");
	}
}

module.exports = checkAuth;
