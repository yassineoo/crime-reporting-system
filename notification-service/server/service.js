const express = require("express");
const amqplib = require("amqplib");

//const Notification = require('./lib/notification');

const service = express();

module.exports = (config) => {
	//	const notification = new Notification();

	const log = config.log();

	const q = "alertMessage2";
	async function connectAndConsume() {
		try {
			const conn = await amqplib.connect("amqp://localhost");
			const ch = await conn.createChannel();
			await ch.assertQueue(q);
			await ch.consume(q, async (msg) => {
				if (msg !== null) {
					log.debug(`Got message ${msg.content.toString()}`);
					const qm = JSON.parse(msg.content.toString());

					log(qm.user + " is trying to hacked ");

					await ch.ack(msg);
				}
			});
		} catch (err) {
			console.error(err);
			//log.fatal(err);
		}
	}
	try {
		connectAndConsume();
	} catch (error) {
		console.log(error);
	}

	// Add a request logging middleware in development mode
	if (service.get("env") === "development") {
		service.use((req, res, next) => {
			log.debug(`${req.method}: ${req.url}`);
			return next();
		});
	}
	service.get("/test", (req, res) => {
		res.send("test");
	});
	service.use(function (req, res, next) {
		res.status(404).json({ error: "Not found" });
	});

	// eslint-disable-next-line no-unused-vars
	service.use((error, req, res, next) => {
		res.status(error.status || 500);
		// Log out the error to the console
		//log.error(error);
		return res.json({
			error: {
				message: error.message,
			},
		});
	});
	return service;
};
