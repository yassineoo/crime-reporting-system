import { FindingsTable } from "./FindingsTable";

export default function FactsFindings({ data }) {
	return (
		<div className='w-full px-10 py-7 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<h3 className='text-xl text-center font-semibold w-48 relative top-0 -mt-8 bg-gray-100 px-2 '>
					Facts and Findings
				</h3>
				<FindingsTable></FindingsTable>
			</div>
		</div>
	);
}
