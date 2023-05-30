const express = require('express');

const router = express.Router();

module.exports = (param) => {
	const { authentification } = param;
	router.get('/register', async (req, res, next) => {
		res.json({ message: 'register' });
	});

	router.post('/login', async (req, res, next) => {
		try {
			const data = req.body;
			const results = await authentification.login(data);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});
	return router;
};
