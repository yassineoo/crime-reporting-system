const prisma = require('../../prisma/dbConnection');

class ReportsService {
	constructor() {}

	async addEntry(name, title, message) {
		return 3;
	}

	async getList() {
		const data = await prisma.crimes.findMany();
		return data;
	}

	async getData() {
		return 2;
	}
}

module.exports = ReportsService;
