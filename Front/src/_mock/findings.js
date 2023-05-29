import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const findings = [...Array(3)].map((_, index) => ({
	date: faker.date.past(),
	time: sample(["12:00", "13:00"]),
	content: sample(["Theft", "Incident"]),
}));

export default findings;
