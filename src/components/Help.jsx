"use client";
import React, { useState } from "react";

const HelpDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			<button
				onClick={toggleDropdown}
				className="text-secondary-300 hover:text-secondary-500"
			>
				Help
			</button>
			{isOpen && (
				<div className="w-[500px] absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2">
					<div className="px-4 py-2">
						<ol className="pb-4">
							<li className="pt-2">Viewing Characters: </li>
							<p className="text-sm text-text-800">
								When you first enter the game, you'll see a list of characters
								displayed in two sections: "Character #1" and "Character
								#2".Each section contains a paginated list of characters that
								you can scroll through.
							</p>
							<li className="pt-2">Choosing Characters: </li>
							<p className="text-sm text-text-800">
								To choose a character, simply click on their name or image in
								either the "Character #1" or "Character #2" section. Once you
								select a character from each section, you'll be able to see the
								list of episodes they appear in.
							</p>
							<li className="pt-2">Viewing Episodes: </li>
							<p className="text-sm text-text-800">
								After selecting a character from both sections, the game will
								display a list of episodes that each character appears in. The
								episodes will be listed separately for each character, under
								headings like "Character #1 - Episodes" and "Character #2 -
								Episodes".
							</p>
							<li className="pt-2">Checking Shared Episodes: </li>
							<p className="text-sm text-text-800">
								If the selected characters appear in the same episode, it will
								be listed under a "Shared Episodes" section. This section will
								show you which episodes both characters are present in together.
							</p>
							<li className="pt-2">Exploring More Characters: </li>
							<p className="text-sm text-text-800">
								You can always go back to the character selection screen by
								clicking on the "Home" button in the navigation bar.From there,
								you can select different characters to explore their episodes
								and see if they share any with other characters.
							</p>
						</ol>
					</div>
					<button
						onClick={toggleDropdown}
						className="block ml-3 rounded-md px-4 py-2 text-sm bg-secondary-200 text-text-800 hover:bg-gray-100"
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default HelpDropdown;
