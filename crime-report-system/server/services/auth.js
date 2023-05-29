/* eslint-disable class-methods-use-this */
// const url = require('url');
const axios = require('axios');
// const crypto = require('crypto');
// const amqplib = require('amqplib');

const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class AuthentificationService {
	constructor({ serviceRegistryUrl, serviceVersion }) {
		this.serviceRegistryUrl = serviceRegistryUrl;
		this.serviceVersion = serviceVersion;
	}

	async login(dataLogin) {
		const { ip, port } = await this.getService(
			'authentification-service'
		);
		return this.callService({
			method: 'post',
			url: `http://${ip}:${port}/login`,
			data: dataLogin,
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

module.exports = AuthentificationService;
