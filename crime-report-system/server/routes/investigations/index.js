const express = require('express');

const router = express.Router();
const Authorization = require('../../middelware/auth');
module.exports = (param) => {
	const { investigations } = param;

	router.get('/', Authorization, async (req, res) => {
		try {
			const results = await investigations.getInvestigationList(
				req.user
			);

			return res.status(200).json(results);
		} catch (err) {
			return err;
		}
	});
	router.post('/create', Authorization, async (req, res) => {
		try {
			const data = req.body;
			const results = await investigations.createInvestigation(
				req.user,
				data
			);

			return res.status(200).json(results);
		} catch (err) {
			console.log(err);
			return err;
		}
	});
	router.post('/createFact', Authorization, async (req, res) => {
		try {
			const data = req.body;
			const results = await investigations.createFact(req.user, data);

			return res.status(200).json(results);
		} catch (err) {
			console.log(err);
			return err;
		}
	});

	router.post('/updateFact/:idFact', Authorization, async (req, res) => {
		try {
			const { idFact } = req.params;
			const data = req.body;
			const results = await investigations.updateFact(
				req.user,
				idFact,
				data
			);

			return res.status(200).json(results);
		} catch (err) {
			console.log(err);
			return err;
		}
	});

	router.post(
		'/:idInvestigation/update',
		Authorization,
		async (req, res) => {
			try {
				const { idInvestigation } = req.params;
				const data = req.body;
				const results = await investigations.updateInvestigation(
					req.user,
					idInvestigation,
					data
				);

				return res.status(200).json(results);
			} catch (err) {
				console.log(err);
				return err;
			}
		}
	);

	router.get(
		'/:idInvestigation/:selector',
		Authorization,
		async (req, res) => {
			try {
				const { idInvestigation, selector } = req.params;
				const results = await investigations.getInvestigationById(
					req.user,
					idInvestigation,
					selector
				);
				return res.status(200).json(results);
			} catch (err) {
				console.log(err);
				return next(err);
			}
		}
	);

	return router;
};
