const prisma = require('../../prisma/dbConnection');

class ReportsService {
	constructor() {}
	async getReportsList(user) {
		let res;
		if (await this.allowed(user, 'read_all_reports')) {
			res = await prisma.reports.findMany();
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}
	async getReportById(user, id) {
		let res;

		if (await this.allowed(user, 'read_all_reports')) {
			const report = await prisma.reports.findFirst({
				where: { report_No: Number(id) },
			});
			const citizen = await prisma.persons.findFirst({
				where: { ID_Number: report.citizen_id },
			});
			res = { ...report, ...citizen };
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

module.exports = ReportsService;
