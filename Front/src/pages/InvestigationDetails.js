import GeneralDetails from "../components/InvestigationDetails/GeneralDetails";
import FactsFindings from "../components/InvestigationDetails/FactsFindings";
import Conclusion from "../components/InvestigationDetails/Conclusion";
import { Button } from "@mui/material";
import Iconify from "../components/iconify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";

export function InvestigationDetails() {
	const [conclusion, setConclusion] = useState("");

	const [generalDetails, setGeneralDetails] = useState({
		idReport: "",
		openingDate: "",
		closingDate: "",
		openingTime: "",
		closingTime: "",
		status: "",
		idCitizen: "",
	});

	const [facts, setFacts] = useState([]);

	const { id } = useParams();

	async function getInvestigationDetails() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(
			`/investigations/${id}/investigation`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = response.data;
		console.log(data);
		console.log(data.close_on);

		let openingdate = data.open_on.split("T")[0];
		let openingtime = data.open_on.split("T")[1];
		let closingdate = "TBD";
		let closingtime = "TBD";
		if (data.close_on != "") {
			closingdate = data.close_on.split("T")[0];
			closingtime = data.close_on.split("T")[1];
		}

		let details = {
			idReport: data.report_No,
			openingDate: openingdate,
			closingDate: closingdate,
			openingTime: openingtime,
			closingTime: closingtime,
			status: data.Status,
			idCitizen: data.started_by,
		};
		setGeneralDetails(details);

		setConclusion(data.conclusion);

		setFacts(data.facts);
		console.log(data.facts);
	}

	useEffect(() => {
		getInvestigationDetails();
	}, []);

	return (
		<div className='bg-gray-100 w-full px-10 py-6 flex flex-col justify-center items-center rounded-2xl'>
			<h3 className='text-3xl font-bold text-center'>Investigation Details</h3>
			<GeneralDetails data={generalDetails}></GeneralDetails>
			<FactsFindings data={facts}></FactsFindings>
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
