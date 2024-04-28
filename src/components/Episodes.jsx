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

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="my-10 md:flex justify-between p-10 rounded-2xl bg-primary-200 backdrop-blur-lg">
			<button
				onClick={handleScrollToTop}
				className="bg-primary-100 text-text-900 font-poppins font-semibold text-sm px-4 py-2 rounded-md  fixed bottom-10 right-10 shadow-md"
			>
				Back to Top
			</button>
			<div className="md:w-1/3">
				<div className="md:flex mb-2 justify-start">
					<img
						src={characters[0].image}
						alt=""
						className="w-0 md:w-24 rounded-md shadow-md"
					/>
					<div className="flex-col">
						<p className="px-4 text-3xl font-poppins font-semibold mt-8">
							{characters[0].name}
						</p>
						<p className="px-4 text-3xl font-poppins font-medium text-secondary-500">
							Only Episodes
						</p>
					</div>
				</div>
				<div className="mt-10">
					<ul className="font-poppins text-text-900">
						{character1Episodes.map((episode) => (
							<div className="flex items-center justify-start w-2/3 py-2">
								<div className="w-1/6 pr-2 pb-2">
									<li
										key={episode.id}
										className="font-bold text-2xl text-right text-secondary-400"
									>
										{episode.id}
									</li>
								</div>
								<div className="w-5/6 flex flex-col pb-2 border-b-2 border-primary-100/50">
									<p key={episode.id} className="font-medium text-sm">
										{episode.name}
									</p>
									<p key={episode.id} className="font-light text-xs">
										Air Date: {episode.air_date}
									</p>
								</div>
							</div>
						))}
					</ul>
				</div>
			</div>
			<div className="md:w-1/3">
				<div className="flex-col">
					<p className="px-4 text-2xl font-poppins font-semibold mt-8">
						{characters[0].name} & {characters[1].name}
					</p>
					<p className="px-4 text-3xl font-poppins font-medium text-secondary-500">
						Shared Episodes
					</p>
				</div>
				{sharedEpisodes.length > 0 ? (
					<div className="mt-10">
						<ul className="font-poppins text-text-900">
							{sharedEpisodes.map((episode) => (
								<div className="flex items-center justify-start w-2/3 py-2">
									<div className="w-1/6 pr-2 pb-2">
										<li
											key={episode.id}
											className="font-bold text-2xl text-right text-secondary-400"
										>
											{episode.id}
										</li>
									</div>
									<div className="w-5/6 flex flex-col pb-2 border-b-2 border-primary-100/50">
										<p key={episode.id} className="font-medium text-sm">
											{episode.name}
										</p>
										<p key={episode.id} className="font-light text-xs">
											Air Date: {episode.air_date}
										</p>
									</div>
								</div>
							))}
						</ul>
					</div>
				) : (
					<p className="text-center mt-16 mb-10 font-poppins text-sm text-text-900">
						{characters[0].name} and {characters[1].name} have no shared
						episodes
					</p>
				)}
			</div>
			<div className="md:w-1/3">
				<div className="flex mb-2 justify-start">
					<img
						src={characters[1].image}
						alt=""
						className="w-0 md:w-24 rounded-md shadow-md"
					/>
					<div className="flex-col">
						<p className="px-4 text-3xl font-poppins font-semibold mt-8">
							{characters[1].name}
						</p>
						<p className="px-4 text-3xl font-poppins font-medium text-secondary-500">
							Only Episodes
						</p>
					</div>
				</div>
				<div className="mt-10">
					<ul className="font-poppins text-text-900">
						{character2Episodes.map((episode) => (
							<div className="flex items-center justify-start w-2/3 py-2">
								<div className="w-1/6 pr-2 pb-2">
									<li
										key={episode.id}
										className="font-bold text-2xl text-right text-secondary-400"
									>
										{episode.id}
									</li>
								</div>
								<div className="w-5/6 flex flex-col pb-2 border-b-2 border-primary-100/50">
									<p key={episode.id} className="font-medium text-sm">
										{episode.name}
									</p>
									<p key={episode.id} className="font-light text-xs">
										Air Date: {episode.air_date}
									</p>
								</div>
							</div>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default EpisodeSection;
