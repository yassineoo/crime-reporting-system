const express = require('express');
const createError = require('http-errors');
//const path = require('path');
const bodyParser = require('body-parser');
const configs = require('./config');
//const Speakers = require('./services/Speakers');
const Reports = require('./services/reports');
const Investigations = require('./services/investigations');
const Authentification = require('./services/auth');
const routes = require('./routes');

const app = express();

const config = configs[app.get('env')];

const cors = require('cors');

const investigations = new Investigations(config);
const reports = new Reports(config);
const authentification = new Authentification(config);

let corsOptions = {
	origin: [
		'http://localhost:3000',
		'0.0.0.0',
		'http://localhost:3001',
		'https://5295-105-235-130-83.ngrok-free.app',
		'*',
	],
	//credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	'/',
	routes({
		reports,
		investigations,
		authentification,
	})
);
app.use(function (req, res, next) {
	res.status(404).json({ error: 'Not found' });
});

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
