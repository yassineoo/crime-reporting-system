const prisma = require('../../prisma/dbConnection');

class InvestigationsService {
	constructor() {}

	async addEntry(name, title, message) {
		return 3;
	}

	async getList() {
		const data = await prisma.investigations.findMany();
		return data;
	}

	async getData() {
		return 2;
	}
}

module.exports = InvestigationsService;
