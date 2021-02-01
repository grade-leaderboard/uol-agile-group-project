// This makes req.user available via 'user' in all views.
// Alternative is passing req.user manually to every route
// for use in nav and other views.
function putUserInAllViews(req, res, next) {
	res.locals.user = req.user;
	next();
}

module.exports = putUserInAllViews;
