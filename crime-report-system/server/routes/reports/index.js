const express = require('express');
const Authorization = require('../../middelware/auth');

const router = express.Router();

module.exports = (param) => {
	const { reports } = param;

	router.get('/', Authorization, async (req, res) => {
		try {
			const results = await reports.getReportsList(req.user);

			return res.status(200).json(results);
		} catch (err) {
			return err;
		}
	});

	router.get('/:idreport', async (req, res, next) => {
		try {
			const { idReport } = req.params.idreport;
			const results = await reports.getReportById(idReport, req.user);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});

	return router;
};
