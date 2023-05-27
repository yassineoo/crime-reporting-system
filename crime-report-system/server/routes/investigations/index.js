const express = require('express');

const router = express.Router();

module.exports = (param) => {
	const { investigation } = param;

	router.get('/', async (req, res) => {
		try {
			const results = await investigation.getInvestigationList();

			return res.status(200).json(results);
		} catch (err) {
			return err;
		}
	});

	router.get('/:idInvestigation', async (req, res, next) => {
		try {
			const { idInvestigation } = req.params;
			const results = await investigation.getInvestigationtById(
				idInvestigation
			);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});

	router.post('/createInvestigation', async (req, res, next) => {
		try {
			const { data } = req.body;
			const results = await investigation.createInvestigation(data);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});

	router.post('/updateInvestigation', async (req, res, next) => {
		try {
			const { data } = req.body;
			const results = await investigation.updateInvestigation(data);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});
	return router;
};
