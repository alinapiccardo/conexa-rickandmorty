"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard.jsx";
import EpisodeSection from "../components/Episodes.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Image from "next/image";
import background from "../../public/background.jpeg";
import "./globals.css";

export default function Home() {
	const [characters, setCharacters] = useState([]);
	const [character1, setCharacter1] = useState([]);
	const [character2, setCharacter2] = useState([]);
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				let allCharacters = [];
				let nextPage = "https://rickandmortyapi.com/api/character";

				while (nextPage) {
					const response = await axios.get(nextPage);
					allCharacters = [...allCharacters, ...response.data.results];
					nextPage = response.data.info.next;
				}

				const midpoint = Math.ceil(allCharacters.length / 2);
				const section1Characters = allCharacters.slice(0, midpoint);
				const section2Characters = allCharacters.slice(midpoint);

				setCharacters({
					section1: section1Characters,
					section2: section2Characters,
				});
			} catch (error) {
				console.error("Error fetching characters:", error);
			}
		};

		fetchCharacters();
	}, []);

	const handleSelectCharacter = (character) => {
		const isAlreadySelected = selectedCharacters.includes(character);
		if (selectedCharacters.length === 2 && !isAlreadySelected) {
			setSelectedCharacters([character]);
			setEpisodes([]);
			return;
		}

		const isSection1Character = characters.section1.includes(character);
		if (selectedCharacters.length === 1) {
			const selectedCharacter = selectedCharacters[0];
			const isSection1Selected =
				characters.section1.includes(selectedCharacter);

			if (isSection1Selected && isSection1Character) {
				setSelectedCharacters([character]);
				setEpisodes([]);
				return;
			} else if (!isSection1Selected && !isSection1Character) {
				setSelectedCharacters([character]);
				setEpisodes([]);
				return;
			}
		}

		let updatedSelectedCharacters;
		if (isAlreadySelected) {
			updatedSelectedCharacters = selectedCharacters.filter(
				(c) => c !== character
			);
		} else {
			updatedSelectedCharacters = [...selectedCharacters, character];
		}
		setSelectedCharacters(updatedSelectedCharacters);
		if (updatedSelectedCharacters.length === 2) {
			fetchEpisodes(updatedSelectedCharacters);
		}
	};

	const fetchEpisodes = async (selectedCharacters) => {
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

	const handleResetCharacters = () => {
		setSelectedCharacters([]);
		setEpisodes([]);
	};

	useEffect(() => {
		if (selectedCharacters.length < 2) {
			setEpisodes([]);
		}
	}, [selectedCharacters]);

	return (
		<div className="h-full w-full scroll-smooth">
			<div className="relative w-full h-fit bg-background-900/60">
				<Image
					src={background}
					alt="background"
					className="absolute -z-50 w-full h-full"
				/>
				<div className="w-full">
					<NavBar />
				</div>
				<div className="w-full px-14 mx-auto">
					<h1 className="text-6xl text-primary-100 text-center font-poppins font-black mt-16 mb-28">
						Welcome to R&M Character World!
					</h1>
					<div className="grid grid-cols-2 gap-4 mt-10 bg-transparent">
						<div className="w-full">
							<h2 className="text-2xl text-text-900 font-poppins font-semibold bg-background-100 w-fit px-3 mb-2 rounded-md">
								Choose Character #1
							</h2>
							<div className="flex flex-wrap justify-around px-2 h-screen overflow-y-scroll">
								{characters.section1 &&
									characters.section1.map((character) => (
										<div className="" key={character.id}>
											<CharacterCard
												character={character}
												isSelected={selectedCharacters.includes(character)}
												onSelect={handleSelectCharacter}
											/>
										</div>
									))}
							</div>
						</div>
						<div className="w-full">
							<h2 className="text-2xl text-text-900 font-poppins font-semibold bg-background-100 w-fit px-3 mb-2 rounded-md">
								Choose Character #2
							</h2>
							<div className="flex flex-wrap justify-around px-2 h-screen overflow-y-scroll">
								{characters.section2 &&
									characters.section2.map((character) => (
										<div className="" key={character.id}>
											<CharacterCard
												character={character}
												isSelected={selectedCharacters.includes(character)}
												onSelect={handleSelectCharacter}
											/>
										</div>
									))}
							</div>
						</div>
					</div>
					<div className="w-full text-center mt-10">
						<button
							onClick={handleResetCharacters}
							className="bg-primary-100 text-text-900 font-poppins font-semibold text-sm px-4 py-2 rounded-md  shadow-md"
						>
							Reset All Characters
						</button>
					</div>
					{selectedCharacters.length === 2 && (
						<EpisodeSection
							characters={selectedCharacters}
							episodes={episodes}
						/>
					)}
				</div>
				<div className="w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
}
