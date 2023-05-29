import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const reports = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	citizenName: faker.name.fullName(),
	date: faker.date.birthdate(),
	sector: sample(["Beaulieu", "Oued Smar"]),
	type: sample(["Theft", "Incident"]),
}));

export default reports;
