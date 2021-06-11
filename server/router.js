const router = require("express").Router();
const { User } = require("./models");

router.get("/", (req, res) => {
	console.log("hello");
	res.status(200).json("hello");
});

router.post("/register", (req, res) => {
	const { email, password } = req.body;
	User.create({ email, password })
		.then((user) => {
			res.status(201).json({ id: user.id, email: user.email });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json("Internal Server Error");
		});
});

module.exports = router;
