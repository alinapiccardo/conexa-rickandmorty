"use client";
import React from "react";

const EpisodeSection = ({ characters, episodes }) => {
	const character1Episodes = episodes.filter((episode) =>
		characters[0].episode.includes(episode.url)
	);
	const character2Episodes = episodes.filter((episode) =>
		characters[1].episode.includes(episode.url)
	);
	const sharedEpisodes = episodes.filter(
		(episode) =>
			characters[0].episode.includes(episode.url) &&
			characters[1].episode.includes(episode.url)
	);

	return (
		<div className="w-full mt-8 flex justify-between pr-5">
			<div className="w-1/3">
				<div className="flex mb-2">
					<img
						src={characters[0].image}
						alt=""
						className="w-36 rounded-md shadow-md"
					/>
					<h2 className="p-4 text-3xl font-poppins font-semibold self-center">
						{characters[0].name} - Only Episodes
					</h2>
				</div>
				<div>
					<ul className="font-poppins text-sm text-text-900">
						{character1Episodes.map((episode) => (
							<li key={episode.id}>
								Episode {episode.id}: {episode.name} - {episode.air_date}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="w-1/3 h-max bg-background-900 bg-opacity-50 shadow-lg rounded-lg">
				<h2 className="p-4 text-3xl text-center font-poppins font-semibold self-center my-5">
					Shared Episodes
				</h2>
				{sharedEpisodes.length > 0 ? (
					<ul className="text-center mt-16 mb-10 font-poppins text-sm text-text-900">
						{sharedEpisodes.map((episode) => (
							<li key={episode.id}>
								Episode {episode.id}: {episode.name} - {episode.air_date}
							</li>
						))}
					</ul>
				) : (
					<p className="text-center mt-16 mb-10 font-poppins text-sm text-text-900">
						{characters[0].name} and {characters[1].name} have no shared
						episodes
					</p>
				)}
			</div>
			<div className="w-1/3">
				<div className="flex mb-2">
					<h2 className="p-4 text-3xl font-poppins font-semibold self-center text-right">
						{characters[1].name} - Only Episodes
					</h2>
					<img
						src={characters[1].image}
						alt=""
						className="w-36 rounded-md shadow-md"
					/>
				</div>
				<ul className="text-right font-poppins text-sm text-text-900">
					{character2Episodes.map((episode) => (
						<li key={episode.id}>
							Episode {episode.id}: {episode.name} - {episode.air_date}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default EpisodeSection;
