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

	router.get('/:idreport', Authorization, async (req, res, next) => {
		try {
			const idReport = req.params.idreport;
			const results = await reports.getReportById(req.user, idReport);
			return res.status(200).json(results);
		} catch (err) {
			return next(err);
		}
	});

	return router;
};
