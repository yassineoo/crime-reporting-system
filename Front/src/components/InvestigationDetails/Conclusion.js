export default function Conclusion({ data }) {
	return (
		<div className='w-full px-10 py-2 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-lg font-semibold'>Conclusion</h3>
				<div className='col-span-1 font-normal mb-1'>{data}</div>
			</div>
		</div>
	);
}
