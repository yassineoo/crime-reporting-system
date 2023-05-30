import GeneralDetails from "../components/InvestigationDetails/GeneralDetails";
import FactsFindings from "../components/InvestigationDetails/FactsFindings";
import Conclusion from "../components/InvestigationDetails/Conclusion";
import { Button } from "@mui/material";
import Iconify from "../components/iconify";

export function InvestigationDetails() {
	let generalDetails = {
		idReport: "1",
		openingDate: "11/02/2002",
		closingDate: "11/02/2002",
		openingTime: "9.12",
		closingTime: "10.30",
		status: "Ongoing",
		idCitizen: "Lamine",
	};

	let conclusion = "Yekfa laman, tura dayen, tekfa niya deg ulawen";

	return (
		<div className='bg-gray-100 w-full px-10 py-6 flex flex-col justify-center items-center rounded-2xl'>
			<h3 className='text-3xl font-bold text-center'>Investigation Details</h3>
			<GeneralDetails data={generalDetails}></GeneralDetails>
			<FactsFindings></FactsFindings>
			<Conclusion data={conclusion}></Conclusion>
			<Button
				className='w-1/6'
				variant='contained'
				startIcon={<Iconify icon='feather:save' />}
			>
				Save
			</Button>
		</div>
	);
}
