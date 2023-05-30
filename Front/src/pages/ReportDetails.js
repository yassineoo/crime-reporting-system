import ProfileDetails from "../components/ReportDetails/ProfileDetails";
import GeneralDetails from "../components/ReportDetails/GeneralDetails";
import IncidentDetails from "../components/ReportDetails/IncidentDetails";
import { Button } from "@mui/material";
import Iconify from "../components/iconify";

export function ReportDetails() {
	let citizenDetails = {
		id: "1",
		lastName: "Brahami",
		firstName: "Lamine",
		dateOfBirth: "26/11/2002",
		address: "Aokas",
		phone: "0552186484",
	};

	let generalDetails = {
		idReport: "1",
		date: "11/02/2002",
		time: "9.12",
		sector: "Beaulieu",
		type: "Theft",
	};

	let incidentDetails = {
		date: "11/02/2002",
		time: "9.12",
		location: "Aokas, Bejaia, Algerie",
		statement: "Ehh lukan at tzered, lhal anida yewwed, ul tzemirt ara atamnet",
		evidence: {
			evidence1: "Photo",
			evidence2: "Video",
		},
	};

	return (
		<div className='bg-gray-100 w-full px-10 py-6 flex flex-col justify-center items-center rounded-2xl'>
			<h3 className='text-3xl font-bold text-center'>Report Details</h3>
			<GeneralDetails data={generalDetails}></GeneralDetails>
			<ProfileDetails data={citizenDetails}></ProfileDetails>
			<IncidentDetails data={incidentDetails}></IncidentDetails>
			<Button
				className='w-1/4'
				variant='contained'
				startIcon={<Iconify icon='eva:plus-fill' />}
			>
				Investigate now
			</Button>
		</div>
	);
}
