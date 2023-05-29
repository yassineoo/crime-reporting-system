const express = require('express');

const router = express.Router();

const reportsRoute = require('./reports');
const investigationsRoute = require('./investigations');
const authentificationRoute = require('./authentification');

module.exports = (param) => {
	router.use('/reports', reportsRoute(param));
	router.use('/investigations', investigationsRoute(param));
	router.use('/auth', authentificationRoute(param));

	return router;
};
