import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const investigations = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	idReport: faker.datatype.uuid(),
	openingDate: faker.date.birthdate(),
	closingDate: faker.date.birthdate(),
	status: sample(["Ongoing", "Archived", "Pending", "Closed"]),
}));

export default investigations;
