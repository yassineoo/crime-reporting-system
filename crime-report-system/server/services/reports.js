/* eslint-disable class-methods-use-this */
// const url = require('url');
const axios = require('axios');
// const crypto = require('crypto');
// const amqplib = require('amqplib');

const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class ReportsService {
	constructor({ serviceRegistryUrl, serviceVersion }) {
		this.serviceRegistryUrl = serviceRegistryUrl;
		this.serviceVersion = serviceVersion;
	}

	async getReportsList(user) {
		const { ip, port } = await this.getService('reports-service');
		const queryParams = user;
		console.log('we are calling the reports ', user);
		return this.callService({
			method: 'get',
			url: `http://${ip}:${port}/reports`,

			headers: {
				user_id: user.id,
				user_role: user.idRole,
				// Other custom headers if needed
			},
		});
	}

	async getReportById(user, idReport) {
		const { ip, port } = await this.getService('reports-service');

		console.log('we are calling the reports ', user);
		return this.callService({
			method: 'get',
			url: `http://${ip}:${port}/getReportById/${idReport}`,

			headers: {
				user_id: user.id,
				user_role: user.idRole,
				// Other custom headers if needed
			},
		});
	}

	async callService(reqOptions) {
		const result = await circuitBreaker.callService(reqOptions);
		return result;
	}

	async getService(servicename) {
		const response = await axios.get(
			`${this.serviceRegistryUrl}/find/${servicename}/${this.serviceVersion}`
		);
		return response.data;
	}
}

module.exports = ReportsService;
