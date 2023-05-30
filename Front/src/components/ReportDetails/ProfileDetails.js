export default function ProfileDetails({ data }) {
	return (
		<div className='w-full px-10 py-5 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold w-20 relative top-0 -mt-8 bg-gray-100 px-2'>
					Citizen
				</h3>

				<div className='w-full grid grid-cols-3 text-lg font-bold'>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Last name : &nbsp;</h4>{" "}
						{data.lastName}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>First name :&nbsp; </h4>{" "}
						{data.firstName}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>ID # : &nbsp;</h4> {data.id}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Date of birth :&nbsp; </h4>{" "}
						{data.dateOfBirth}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Adress :&nbsp; </h4>{" "}
						{data.address}
					</div>
					<div className='col-span-1 font-normal mb-1 flex'>
						<h4 className='text-lg font-semibold'>Phone : &nbsp;</h4>{" "}
						{data.phone}
					</div>
				</div>
			</div>
		</div>
	);
}
