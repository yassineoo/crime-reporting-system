const express = require('express');
const createError = require('http-errors');
//const path = require('path');
const bodyParser = require('body-parser');
const configs = require('./config');
//const Speakers = require('./services/Speakers');
const Reports = require('./services/reports');
const Investigations = require('./services/investigations');

const routes = require('./routes');

const app = express();

const config = configs[app.get('env')];

const investigations = new Investigations(config);
const reports = new Reports(config);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	'/',
	routes({
		reports,
		investigations,
	})
);

app.use((req, res, next) => next(createError(404, 'File not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	const status = err.status || 500;
	res.locals.status = status;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(status);
	return res.render('error');
});

app.listen(8000, () => {
	console.log('main server running on port 8000');
});

module.export = app;
