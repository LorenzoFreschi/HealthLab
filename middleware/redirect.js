const redirect = (req, res, next) => {
	if (res.status(404)) {
		res.redirect('/404.html');
	}

	next();
};

module.exports = redirect;
