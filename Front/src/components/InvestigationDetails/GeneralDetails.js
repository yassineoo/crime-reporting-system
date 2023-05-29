export default function GeneralDetails({ data }) {
	return (
		<div className='w-full px-10 py-2 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold'>General</h3>

				<div className='w-full grid grid-cols-3'>
					<div className='col-span-1 font-normal mb-1'>
						Report # : {data.idReport}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Opened on : {data.openingDate}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Time : {data.openingTime}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Status : {data.status}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Closed on : {data.closingDate}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Time : {data.closingTime}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Started by : {data.idCitizen}
					</div>
				</div>
			</div>
		</div>
	);
}
