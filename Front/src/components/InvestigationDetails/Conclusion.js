import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Conclusion({ data }) {
	const [valeur, setValeur] = useState(data); // État pour stocker la valeur du champ de texte
	const [isEditing, setIsEditing] = useState(false); // État pour suivre l'état de modification du champ de texte

	const handleClick = () => {
		setIsEditing(!isEditing); // Bascule entre l'état de modification lors du clic sur l'icône
	};

	const handleChange = (event) => {
		setValeur(event.target.value); // Mettre à jour la valeur du champ de texte lors de la modification par l'utilisateur
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleClick(); // Quitter le mode d'édition lorsque la touche "Enter" est enfoncée
		}
	};

	return (
		<div className='w-full px-10 py-3 mb-10 flex flex-col'>
			<div className='flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 border-azegza'>
				<div className='flex items-center gap-3 w-36 relative top-0 -mt-8 bg-gray-100 px-2'>
					<h3 className='text-xl text-center font-semibold  '>Conclusion</h3>
					<FaEdit onClick={handleClick} className='cursor-pointer' />
				</div>
				<div className='col-span-1 font-normal mb-1'>
					{isEditing ? (
						<textarea
							type='text'
							value={valeur}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							className='text-azegza w-full h-[80px] '
							id='01'
						/>
					) : (
						<p className='w-full '>{valeur}</p>
					)}
				</div>
			</div>
		</div>
	);
}
