const express = require('express');
// const amqplib = require('amqplib');

const Authentification = require('./lib/authentification');

const service = express();
service.use(express.json());
module.exports = (config) => {
	const authentification = new Authentification();

	const log = config.log();
	/*
	const q = 'feedback';

	amqplib
		.connect('amqp://localhost')
		.then((conn) => conn.createChannel())
		.then((ch) =>
			ch.assertQueue(q).then(() =>
				ch.consume(q, (msg) => {
					if (msg !== null) {
						log.debug(
							`Got message ${msg.content.toString()}`
						);
						const qm = JSON.parse(msg.content.toString());
						feedback
							.addEntry(qm.name, qm.title, qm.message)
							.then(() => ch.ack(msg));
					}
				})
			)
		)
		.catch((err) => log.fatal(err));
*/
	// Add a request logging middleware in development mode
	if (service.get('env') === 'development') {
		service.use((req, res, next) => {
			log.debug(`${req.method}: ${req.url}`);
			return next();
		});
	}

	service.post('/login', async (req, res, next) => {
		const { username, password } = req.body;

		try {
			return res.json(
				await authentification.login(username, password)
			);
		} catch (err) {
			return next(err);
		}
	});

	// eslint-disable-next-line no-unused-vars
	service.use((error, req, res, next) => {
		res.status(error.status || 500);
		// Log out the error to the console
		log.error(error);
		return res.json({
			error: {
				message: error.message,
			},
		});
	});
	return service;
};
