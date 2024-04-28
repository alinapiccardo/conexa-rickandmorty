import React from "react";

const CharacterCard = ({ character, isSelected, onSelect }) => {
	const handleClick = () => {
		onSelect(character);
	};

	return (
		<div
			className={`w-full my-2 border-2 p-1 border-secondary-200 bg-primary-300/10 backdrop-blur-lg rounded-lg shadow-md ${
				isSelected
					? "border-b-4 border-r-4 border-secondary-100 bg-primary-300/80"
					: ""
			}`}
			onClick={handleClick}
		>
			<div className="flex flex-col">
				<img
					src={character.image}
					alt={character.name}
					className="rounded-md w-full object-cover"
				/>
				<h2 className="text-md text-center text-primary-100 font-poppins font-semibold pt-2">
					{character.name}
				</h2>
				<div className="flex py-2 relative rounded-b-md justify-around">
					<div className="bg-primary-100 p-2 rounded-md">
						<p className="text-xs font-poppins text-primary-800">
							Status: {character.status}
						</p>
					</div>
					<div className="bg-primary-100 p-2 rounded-md">
						<p className="text-xs font-poppins text-primary-800">
							Species: {character.species}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
