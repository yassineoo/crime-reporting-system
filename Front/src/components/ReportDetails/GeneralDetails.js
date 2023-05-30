export default function GeneralDetails({ data }) {
	return (
		<div className='w-full px-10 py-5 flex flex-col mt-10'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold w-20 relative top-0 -mt-8 bg-gray-100 px-2'>
					General
				</h3>

				<div className='w-full grid grid-cols-3 text-lg font-bold'>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Report # : &nbsp; </h4>
						{"  "}
						{data.idReport}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Submitted on :&nbsp; </h4>{" "}
						{data.date}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Time : &nbsp;</h4> {data.time}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold '>Sector : &nbsp;</h4>{" "}
						{data.sector}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Report type : &nbsp;</h4>{" "}
						{data.type}
					</div>
				</div>
			</div>
		</div>
	);
}
