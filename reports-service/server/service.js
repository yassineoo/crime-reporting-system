const express = require("express");
// const amqplib = require('amqplib');

const Reports = require("./lib/reports");

const service = express();
const cors = require("cors");
service.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
module.exports = (config) => {
	const reports = new Reports();

	const log = config.log();

	// Add a request logging middleware in development mode
	if (service.get("env") === "development") {
		service.use((req, res, next) => {
			log.debug(`${req.method}: ${req.url}`);
			return next();
		});
	}

	service.get("/reports", async (req, res, next) => {
		const user = {
			id: req.headers.user_id,
			idRole: req.headers.user_role,
		};
		try {
			//return res.status(200).json({ results: [1, 2, 5] });
			return res.json(await reports.getReportsList(user));
		} catch (err) {
			return next(err);
		}
	});

	service.get("/getReportById/:id", async (req, res, next) => {
		const user = {
			id: req.headers.user_id,
			idRole: req.headers.user_role,
		};
		const id = req.params.id;
		try {
			return res.json(await reports.getReportById(user, id));
		} catch (err) {
			return next(err);
		}
	});

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
