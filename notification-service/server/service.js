const express = require('express');
const amqplib = require('amqplib');

const Reports = require('./lib/reports');

const service = express();

module.exports = (config) => {
	const reports = new Reports();

	const log = config.log();

	const q = 'alertMessage';
	async function connectAndConsume() {
		try {
			const conn = await amqplib.connect('amqp://localhost');
			const ch = await conn.createChannel();
			await ch.assertQueue(q);
			await ch.consume(q, async (msg) => {
				if (msg !== null) {
					log.debug(`Got message ${msg.content.toString()}`);
					const qm = JSON.parse(msg.content.toString());
					log(qm.user + ' is trying to hacked ');
					await feedback.addEntry(qm.name, qm.title, qm.message);
					await ch.ack(msg);
				}
			});
		} catch (err) {
			log.fatal(err);
		}
	}

	// Add a request logging middleware in development mode
	if (service.get('env') === 'development') {
		service.use((req, res, next) => {
			log.debug(`${req.method}: ${req.url}`);
			return next();
		});
	}

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
