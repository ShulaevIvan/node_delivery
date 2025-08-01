const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ error: 'The user is not authenticated' });
};

module.exports = isAuthenticated;