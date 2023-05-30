import { FiExternalLink } from "react-icons/fi";

export default function IncidentDetails({ data }) {
	return (
		<div className='w-full px-10 py-5 mb-10 flex flex-col text-lg font-bold'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold w-20 relative top-0 -mt-8 bg-gray-100 px-2'>
					Incident
				</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Date :&nbsp; </h4> {data.date}
					</div>
					<div className='col-span-1 font-normal mb-1 flex '>
						<h4 className='text-lg font-semibold'>Time :&nbsp; </h4>
						{data.time}
					</div>
				</div>
				<div className='col-span-1 font-normal mb-1 flex'>
					<h4 className='text-lg font-semibold'>Precise location :&nbsp; </h4>
					{"  "}
					{data.location}
				</div>
				<div className='col-span-1 font-normal mb-1 flex'>
					<div>
						<h4 className='text-lg font-semibold'>Vectim statement :&nbsp; </h4>
						{"  "}
						<p>{data.statement}</p>
					</div>
				</div>
				<div className='col-span-1 font-normal mb-1'>
					<h4 className='text-lg font-semibold'> Provided evidence : </h4>
					{"  "}
					<ul>
						{Object.entries(data.evidence).map(([key, value]) => (
							<li key={key} className='flex '>
								<span className='list-item-bullet'>&bull;</span>
								<span>{value}</span>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<FiExternalLink />
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
