/* eslint-disable class-methods-use-this */
//const url = require('url');
const axios = require('axios');
//const crypto = require('crypto');
//const amqplib = require('amqplib');

const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class InvestigationsService {
	constructor({ serviceRegistryUrl, serviceVersion }) {
		this.serviceRegistryUrl = serviceRegistryUrl;
		this.serviceVersion = serviceVersion;
	}

	async getInvestigationList(user) {
		console.log('second inves getalll');

		const { ip, port } = await this.getService('investigations-service');
		return this.callService({
			method: 'get',
			url: `http://${ip}:${port}/investigations`,

			headers: {
				user_id: user.id,
				user_role: user.idRole,
				// Other custom headers if needed
			},
		});
	}
	async getInvestigationById(user, id, selector) {
		const { ip, port } = await this.getService('investigations-service');
		console.log('we are calling the Investigations ', user);
		return this.callService({
			method: 'get',
			url: `http://${ip}:${port}/investigations/${id}/${selector}`,
			headers: {
				user_id: user.id,
				user_role: user.idRole,
				// Other custom headers if needed
			},
		});
	}
	async createInvestigation(user, data) {
		const { ip, port } = await this.getService('investigations-service');

		return this.callService({
			method: 'post',
			url: `http://${ip}:${port}/investigations/create`,
			data,
			headers: {
				user_id: user.id,
				user_role: user.idRole,
				// Other custom headers if needed
			},
		});
	}
	async updateInvestigation(user, idInvestigation, data) {
		const { ip, port } = await this.getService('investigations-service');

		return this.callService({
			method: 'post',
			url: `http://${ip}:${port}/investigations/${idInvestigation}/update`,
			data,
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

module.exports = InvestigationsService;
