const router = require("express").Router();
const { User, Inventory } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");

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

router.post("/login", (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				res.status(404).json("Invalid Password / Email");
			}
			const validate = bcrypt.compareSync(
				String(req.body.password),
				user.password
			);
			if (validate) {
				const access_token = jwt.sign(
					{ email: user.email, id: user.id },
					process.env.JWT_SECRET
				);
				res.status(200).json({ access_token });
			} else if (!validate) {
				res.status(404).json("Invalid Password / Email");
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json("Internal Server Error");
		});
});

router.get("/inventories", auth, (req, res) => {
	Inventory.findAll()
		.then((inventories) => {
			res.status(200).json(inventories);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json("Internal Server Error");
		});
});

module.exports = router;
