import React from "react";

function Logo() {
	return (
		<div className='flex justify-center items-center'>
			<img src='/policeLogo.svg' alt='Logo' className='w-1/2 h-2/3' />
			<h1 className='text-white font-bold text-xl'>National Police</h1>
		</div>
	);
}

export default Logo;
