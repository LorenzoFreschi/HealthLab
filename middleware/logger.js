const moment = require('moment');

const logger = (req, res, next) => {
	console.log(
		`${req.protocol}://${req.get('host')}${
			req.originalUrl
		}: ${moment().format()}`

		//todo log in a file
	);
	next();
};

module.exports = logger;
