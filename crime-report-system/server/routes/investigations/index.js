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

	router.get('/:idInvestigation', Authorization, async (req, res, next) => {
		try {
			const { idInvestigation } = req.params;
			const results = await investigations.getInvestigationtById(
				idInvestigation
			);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});

	router.post(
		'/createInvestigation',
		Authorization,
		async (req, res, next) => {
			try {
				const { data } = req.body;
				const results = await investigation.createInvestigation(
					data
				);
				return res.status(200).json(results);
			} catch (err) {
				return next(err);
			}
		}
	);

	router.post(
		'/updateInvestigation',
		Authorization,
		async (req, res, next) => {
			try {
				const { data } = req.body;
				const results = await investigation.updateInvestigation(
					data
				);
				return res.status(200).json(results);
			} catch (err) {
				return next(err);
			}
		}
	);
	return router;
};
