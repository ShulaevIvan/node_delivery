const isAuthenticated = (req, res, next) => {
	console.log(req.session)
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ error: 'The user is not authenticated' });
};

module.exports = isAuthenticated;