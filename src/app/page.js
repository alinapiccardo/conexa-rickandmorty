"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard.jsx";
import EpisodeSection from "../components/Episodes.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import "./globals.css";

export default function Home() {
	const [characters, setCharacters] = useState([]);
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const response = await axios.get(
					"https://rickandmortyapi.com/api/character"
				);
				setCharacters(response.data.results);
			} catch (error) {
				console.error("Error fetching characters:", error);
			}
		};

		fetchCharacters();
	}, []);

	const handleSelectCharacter = (character) => {
		const isAlreadySelected = selectedCharacters.includes(character);
		if (selectedCharacters.length === 2) {
			if (isAlreadySelected) {
				setSelectedCharacters(
					selectedCharacters.filter((c) => c !== character)
				);
			}
			return;
		}

		const section = Math.floor(
			characters.indexOf(character) / (characters.length / 2)
		);

		if (isAlreadySelected) {
			setSelectedCharacters(selectedCharacters.filter((c) => c !== character));
		} else {
			const isSameSectionSelected = selectedCharacters.some(
				(c) =>
					Math.floor(characters.indexOf(c) / (characters.length / 2)) ===
					section
			);

			if (isSameSectionSelected) {
				setSelectedCharacters(
					selectedCharacters
						.filter(
							(c) =>
								Math.floor(characters.indexOf(c) / (characters.length / 2)) !==
								section
						)
						.concat(character)
				);
			} else {
				setSelectedCharacters([...selectedCharacters, character]);
			}
		}
	};

	useEffect(() => {
		if (selectedCharacters.length === 2) {
			const fetchEpisodes = async () => {
				try {
					const promises = selectedCharacters.map(async (character) => {
						const characterDetailsResponse = await axios.get(
							`https://rickandmortyapi.com/api/character/${character.id}`
						);
						const characterDetails = characterDetailsResponse.data;
						const characterEpisodes = await Promise.all(
							characterDetails.episode.map(async (episodeUrl) => {
								const episodeId = episodeUrl.split("/").pop();
								const episodeResponse = await axios.get(
									`https://rickandmortyapi.com/api/episode/${episodeId}`
								);
								return episodeResponse.data;
							})
						);
						return { ...characterDetails, episodes: characterEpisodes };
					});
					const charactersWithEpisodes = await Promise.all(promises);
					const allEpisodes = charactersWithEpisodes
						.flatMap((c) => c.episodes)
						.filter((episode, index, self) => {
							return index === self.findIndex((e) => e.id === episode.id);
						});
					setEpisodes(allEpisodes);
				} catch (err) {
					console.error("Error fetching episodes:", err);
				}
			};

			fetchEpisodes();
		}
	}, [selectedCharacters]);

	const section1Characters = characters.slice(0, characters.length / 2);
	const section2Characters = characters.slice(characters.length / 2);

	return (
		<div className="w-full bg-background-50">
			<div className="w-full">
				<NavBar />
			</div>
			<div className="w-full px-14 mx-auto">
				<h1 className="text-3xl font-poppins mt-8">Welcome!</h1>
				<div className="grid grid-cols-2 gap-4 mt-8">
					<div className="w-full">
						<h2 className="text-2xl text-text-900 font-poppins font-semibold">
							Choose Character #1
						</h2>
						<div className="flex flex-wrap justify-evenly">
							{section1Characters.map((character) => (
								<div className="w-1/2" key={character.id}>
									<CharacterCard
										character={character}
										isSelected={selectedCharacters.includes(character)}
										onSelect={handleSelectCharacter}
									/>
								</div>
							))}
						</div>
					</div>
					{selectedCharacters.length > 0 && (
						<div className="w-full">
							<h2 className="text-2xl font-poppins text-text-900 font-semibold">
								Choose Character #2
							</h2>
							<div className="flex flex-wrap justify-evenly">
								{section2Characters.map((character) => (
									<div className="w-1/2" key={character.id}>
										<CharacterCard
											character={character}
											isSelected={selectedCharacters.includes(character)}
											onSelect={handleSelectCharacter}
										/>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				{selectedCharacters.length === 2 && (
					<EpisodeSection characters={selectedCharacters} episodes={episodes} />
				)}
			</div>
			<div className="w-full">
				<Footer />
			</div>
		</div>
	);
}
