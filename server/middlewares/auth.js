const { User } = require("../models");
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
	const access_token = req.headers.access_token;
	if (!access_token) {
		res.status(404).json("Invalid User / Password");
	}
	try {
		const verify = jwt.verify(access_token, process.env.JWT_SECRET);
		if (verify) {
			User.findOne({ where: { email: verify.email } })
				.then((user) => {
					if (user) {
						next();
					} else if (!user) {
						res.status(404).json("Invalid User / Password");
					}
				})
				.catch((err) => {
					console.log(err);
					res.status(404).json("Invalid User / Password");
				});
		} else if (!verify) {
			res.status(404).json("Invalid User / Password");
		}
	} catch (error) {}
};

module.exports = auth;
