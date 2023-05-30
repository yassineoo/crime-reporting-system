const express = require('express');
// const amqplib = require('amqplib');

const Investigations = require('./lib/investigations');

const service = express();
service.use(express.json());
module.exports = (config) => {
	const investigations = new Investigations();

	const log = config.log();

	// Add a request logging middleware in development mode
	if (service.get('env') === 'development') {
		service.use((req, res, next) => {
			log.debug(`${req.method}: ${req.url}`);
			return next();
		});
	}

	service.get('/investigations', async (req, res, next) => {
		console.log('welcom to inves service');
		const user = {
			id: req.headers.user_id,
			idRole: req.headers.user_role,
		};
		try {
			return res.json(
				await investigations.getInvestigationsList(user)
			);
		} catch (err) {
			return next(err);
		}
	});
	service.get('/investigations/:id/:selector', async (req, res, next) => {
		const user = {
			id: req.headers.user_id,
			idRole: req.headers.user_role,
		};
		const { id, selector = 'report' } = req.params;
		try {
			return res.json(
				await investigations.getInvestigationsById(
					user,
					id,
					selector
				)
			);
		} catch (err) {
			return next(err);
		}
	});

	service.post('/investigations/create', async (req, res, next) => {
		const user = {
			id: req.headers.user_id,
			idRole: req.headers.user_role,
		};
		console.log('.................................');

		console.log(user);
		console.log('.................................');

		const data = req.body;
		try {
			return res.json(
				await investigations.createInvestigations(user, data)
			);
		} catch (err) {
			console.log(err);
			return next(err);
		}
	});
	service.post(
		'/investigations/:idInvestigation/update',
		async (req, res, next) => {
			console.log(req.body);
			const user = {
				id: req.headers.user_id,
				idRole: req.headers.user_role,
			};
			const { idInvestigation } = req.params;
			const data = req.body;
			try {
				return res.json(
					await investigations.updateInvestigation(
						user,
						idInvestigation,
						data
					)
				);
			} catch (err) {
				console.log(err);
				return next(err);
			}
		}
	);

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
