const prisma = require("../../prisma/dbConnection");

class InvestigationsService {
	constructor() {}

	async getInvestigationsList(user) {
		let res;
		if (await this.allowed(user, "read_all_investigations")) {
			res = await prisma.investigation.findMany();
		} else {
			res = { message: "you  are not authrized " };
		}

		return res;
	}
	async getInvestigationsById(user, id, selector) {
		let res;
		if (await this.allowed(user, "read_all_investigations")) {
			let investigations;
			console.log("-------------.....................---", selector);
			if (selector == "report") {
				console.log("--////////////////////////////-", id);

				investigations = await prisma.investigation.findFirst({
					where: { report_no: Number(id) },
				});
			} else if (selector == "investigation") {
				console.log("-------++++++++++++++++++++++++++-----");

				investigations = await prisma.investigation.findFirst({
					where: { investigations_No: Number(id) },
				});
			}
			console.log("-------------------------------------");
			console.log(investigations);
			console.log("-------------------------------------");

			let report = await prisma.reports.findFirst({
				where: { report_No: investigations.report_no },
			});
			let facts = await prisma.facts_findings.findMany({
				where: {
					investigations_No: investigations.investigations_No,
				},
			});

			res = { ...investigations, ...report, facts };
		} else {
			res = { message: "you  are not authrized " };
		}

		return res;
	}

	async createInvestigations(user, data) {
		let res;
		if (await this.allowed(user, "create_investigation")) {
			const investigations = await prisma.investigation.create({
				data: {
					...data,
					report_no: Number(data.report_no),
					started_by: Number(user.id),
					open_on: new Date(),
					last_updated: new Date(),
				},
			});

			res = { ...investigations };
		} else {
			res = {
				message: "You are not authorized to Create investigations. ",
			};
		}

		return res;
	}
	async createFacts(user, data) {
		let res;
		if (await this.allowed(user, "modify_investigation")) {
			const investigations = await prisma.facts_findings.create({
				data: {
					...data,
				},
			});

			res = { ...investigations };
		} else {
			res = {
				message: "You are not authorized to Create Facts. ",
			};
		}

		return res;
	}
	async updateFacts(user, idFact, data) {
		let res;
		if (await this.allowed(user, "modify_investigation")) {
			const investigations = await prisma.facts_findings.update({
				where: { fact_id: idFact },
				data: {
					...data,
				},
			});

			res = { ...investigations };
		} else {
			res = {
				message: "You are not authorized to Create Facts. ",
			};
		}

		return res;
	}

	async updateInvestigation(user, id, data) {
		let res;
		if (await this.allowed(user, "modify_investigation")) {
			const investigation = await prisma.investigation.update({
				where: { investigations_No: Number(id) },
				data: { ...data, last_updated: new Date() },
			});

			res = { ...investigation };
		} else {
			res = {
				message: "You are not authorized to update investigations.",
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
