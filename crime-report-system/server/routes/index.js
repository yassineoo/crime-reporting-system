const express = require('express');

const router = express.Router();

const reportsRoute = require('./reports');
const investigationsRoute = require('./investigations');

module.exports = (param) => {
	router.use('/reports', reportsRoute(param));
	router.use('/investigations', investigationsRoute(param));

	return router;
};
