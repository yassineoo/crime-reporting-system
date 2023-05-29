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
						Submitted on : {data.date}
					</div>
					<div className='col-span-1 font-normal mb-1'>Time : {data.time}</div>
					<div className='col-span-1 font-normal mb-1'>
						Sector : {data.sector}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Report type : {data.type}
					</div>
				</div>
			</div>
		</div>
	);
}
