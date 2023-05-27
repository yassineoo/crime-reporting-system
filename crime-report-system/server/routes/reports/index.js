const express = require('express');

const router = express.Router();

module.exports = (param) => {
	const { reports } = param;

	router.get('/', async (req, res) => {
		try {
			const results = await reports.getReportsList();

			return res.status(200).json(results);
		} catch (err) {
			return err;
		}
	});

	router.get('/:idreport', async (req, res, next) => {
		try {
			const { idReport } = req.params.idreport;
			const results = await reports.getReportById(idReport);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});

	return router;
};
