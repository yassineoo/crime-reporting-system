const prisma = require('../../prisma/dbConnection');

class InvestigationsService {
	constructor() {}

	async getInvestigationsList(user) {
		let res;
		if (await this.allowed(user, 'read_all_investigations')) {
			res = await prisma.investigation.findMany();
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}
	async getInvestigationsById(user, id) {
		let res;
		if (await this.allowed(user, 'read_all_investigations')) {
			const investigations = await prisma.investigation.findFirst({
				where: { Crime_No: Number(id) },
			});

			res = { ...investigations };
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}

	async createInvestigations(user, data) {
		let res;
		if (await this.allowed(user, 'create_investigation')) {
			const investigations = await prisma.investigation.create({
				data,
			});

			res = { ...investigations };
		} else {
			res = {
				message: 'You are not authorized to Create investigations. ',
			};
		}

		return res;
	}

	async updateInvestigation(user, id, data) {
		let res;
		if (await this.allowed(user, 'update_investigation')) {
			const investigation = await prisma.investigation.update({
				where: { id },
				data,
			});

			res = { ...investigation };
		} else {
			res = {
				message: 'You are not authorized to update investigations.',
			};
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
