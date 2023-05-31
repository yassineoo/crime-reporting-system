const express = require("express");
// const amqplib = require('amqplib');

const Reports = require("./lib/reports");

const service = express();

var jsAspect = require("js-aspect");
const fs = require("fs");

// Define a custom logging advice
function loggingAdvice(executionContext, userId, userRole) {
	// Get the current time
	const currentTime = new Date().toISOString();
	// Get the target, method, and arguments from the execution context
	const { target, method, arguments } = executionContext;

	// Create a log message
	const logMessage = `Time: ${currentTime} | User ID: ${userId} | Role: ${userRole} | Method '${
		method.name
	}' called with arguments: ${JSON.stringify(arguments)}`;

	// Append the log message to a log file
	fs.writeFileSync("log.txt", logMessage + "\n", (err) => {
		if (err) {
			console.error("Error writing to log file:", err);
		}
	});
}

// Create an instance of the Before advice with the loggingAdvice function
jsAspect.after(
	service,
	function (context) {
		loggingAdvice(context, userId, userRole);
	},
	jsAspect.SCOPE.METHODS
);

let userId;
let userRole;

const cors = require("cors");
service.use(
	cors({
		origin: "*",
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
		userId = req.headers.user_id;
		userRole = req.headers.user_role;
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
