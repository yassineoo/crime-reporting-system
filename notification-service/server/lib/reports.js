class ReportsService {
	constructor() {}
	async getReportsList(user) {
		let res;
		if (await this.allowed(user, 'read_all_reports')) {
			res = await prisma.crimes.findMany();
		} else {
			res = { message: 'you  are not authrized ' };
		}

		return res;
	}

	async allowed(user, permissionName) {
		const permission = await prisma.permissions.findFirst({
			where: { permission_name: permissionName },
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
