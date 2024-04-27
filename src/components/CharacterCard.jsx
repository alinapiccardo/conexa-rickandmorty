import React from "react";

const CharacterCard = ({ character, isSelected, onSelect }) => {
	const handleClick = () => {
		onSelect(character);
	};

	return (
		<div
			className={`w-[95%] my-3 border border-secondary-200 bg-primary-300 bg-opacity-20 rounded-lg shadow-md ${
				isSelected ? "border-b-4 border-r-4 border-secondary-200" : ""
			}`}
			onClick={handleClick}
		>
			<div className="flex">
				<img
					src={character.image}
					alt={character.name}
					className="rounded-l-md w-40 object-cover mr-6"
				/>
				<div className="flex flex-col justify-between py-4">
					<h2 className="text-lg text-text-900 font-poppins font-semibold">
						{character.name}
					</h2>
					<div className="flex mx-2">
						<p className="text-xs font-poppins text-text-600 pr-2">
							Status: {character.status}
						</p>
						<p className="text-xs font-poppins text-text-600">
							Species: {character.species}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
