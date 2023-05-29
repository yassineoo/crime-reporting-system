const prisma = require('../../prisma/dbConnection');

class InvestigationsService {
	constructor() {}

	async getInvestigationsList(user) {
		let res;
		if (await this.allowed(user, 'read_all_reports')) {
			res = await prisma.investigations.findMany();
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}
	async getInvestigationsById(user, id) {
		let res;
		if (await this.allowed(user, 'read_all_investigations')) {
			const investigations = await prisma.investigations.findFirst({
				where: { Crime_No: Number(id) },
			});

			res = { ...investigations };
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}

	async createInvestigations(user, id) {
		let res;
		if (await this.allowed(user, 'read_all_investigations')) {
			const investigations = await prisma.investigations.create({
				where: { Crime_No: Number(id) },
			});

			res = { ...investigations };
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}

	async allowed(user, permission_name) {
		const permission = await prisma.permissions.findFirst({
			where: { permission_name: permission_name },
		});
		const allowed = await prisma.role_permissions.findFirst({
			where: {
				role_id: Number(user.idRole),
				permission_id: permission.permission_id,
			},
		});

		return allowed ? true : false;
	}
}

module.exports = InvestigationsService;
