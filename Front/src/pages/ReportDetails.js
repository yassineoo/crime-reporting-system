import ProfileDetails from "../components/ReportDetails/ProfileDetails";
import GeneralDetails from "../components/ReportDetails/GeneralDetails";
import IncidentDetails from "../components/ReportDetails/IncidentDetails";
import { Button } from "@mui/material";
import Iconify from "../components/iconify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export function ReportDetails() {
	const location = useNavigate();

	const [citizenDetails, setCitizenDetails] = useState({
		id: "",
		lastName: "",
		firstName: "",
		dateOfBirth: "",
		address: "",
		phone: "",
	});

	const [generalDetails, setGeneralDetails] = useState({
		idReport: "1",
		date: "11/02/2002",
		time: "9.12",
		sector: "Beaulieu",
		type: "Theft",
	});

	const [incidentDetails, setIncidentDetails] = useState({
		date: "11/02/2002",
		time: "9.12",
		location: "Aokas, Bejaia, Algerie",
		statement: "Ehh lukan at tzered, lhal anida yewwed, ul tzemirt ara atamnet",
		evidence: {
			evidence1: "Photo",
			evidence2: "Video",
		},
	});

	const { id } = useParams();

	async function getReportDetails() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(`/reports/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = response.data;
		console.log(data);
		let details = {
			id: data.citezen_id,
			lastName: data.lastName,
			firstName: data.firstName,
			dateOfBirth: "10/2/2002",
			address: data.incident_location,
			phone: "0552186484",
		};
		setCitizenDetails(details);

		let date = data.submission_date.split("T")[0];
		let time = data.submission_date.split("T")[1];

		let details2 = {
			idReport: data.report_No,
			date: date,
			time: time,
			sector: data.Sector,
			type: data.Type,
		};
		setGeneralDetails(details2);

		let date2 = data.incident_date.split("T")[0];
		let time2 = data.incident_date.split("T")[1];

		let details3 = {
			date: date2,
			time: time2,
			location: data.incident_location,
			statement: data.victime_statment,
			evidence: data.provided_evdence.split(","),
		};
		setIncidentDetails(details3);
	}

	async function createInvestigation() {
		const token = localStorage.getItem("token");
		let report_no = id;
		let body = {
			report_no,
		};
		const response = await axiosInstance.post(`/investigations/create`, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const response2 = await axiosInstance.get(`/investigations/${id}/report`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response2);
		location(`/investigations/${response.data.investigations_No}`);
	}

	useEffect(() => {
		getReportDetails();
	}, []);

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
				onClick={createInvestigation}
			>
				Investigate now
			</Button>
		</div>
	);
}
