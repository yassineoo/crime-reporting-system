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
	/*
	async addEntry(name, title, message) {
		const q = 'feedback';
		const conn = await amqplib.connect('amqp://localhost');
		const ch = await conn.createChannel();
		await ch.assertQueue(q);
		const qm = JSON.stringify({ name, title, message });
		return ch.sendToQueue(q, Buffer.from(qm, 'utf8'));
	}
*/
	async getReportsList() {
		const { ip, port } = await this.getService('reports-service');
		return this.callService({
			method: 'get',
			url: `http://${ip}:${port}/reports`,
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
