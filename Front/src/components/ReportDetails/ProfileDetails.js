export default function ProfileDetails({ data }) {
	return (
		<div className='w-full px-10 py-2 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold'>Citizen</h3>

				<div className='w-full grid grid-cols-3'>
					<div className='col-span-1 font-normal mb-1'>
						Last name : {data.lastName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						First name : {data.firstName}
					</div>
					<div className='col-span-1 font-normal mb-1'>ID # : {data.id}</div>
					<div className='col-span-1 font-normal mb-1'>
						Date of birth : {data.dateOfBirth}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Address : {data.address}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Phone : {data.phone}
					</div>
				</div>
			</div>
		</div>
	);
}
