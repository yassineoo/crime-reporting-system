import { FiExternalLink } from "react-icons/fi";

export default function IncidentDetails({ data }) {
	return (
		<div className='w-full px-10 py-2 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold'>Incident</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>Date : {data.date}</div>
					<div className='col-span-1 font-normal mb-1'>Time : {data.time}</div>
				</div>
				<div className='col-span-1 font-normal mb-1'>
					Precise location : {data.location}
				</div>
				<div className='col-span-1 font-normal mb-1'>
					<div>
						<p>Victim statement : </p>
						<p>{data.statement}</p>
					</div>
				</div>
				<div className='col-span-1 font-normal mb-1'>
					Provided evidence :
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
