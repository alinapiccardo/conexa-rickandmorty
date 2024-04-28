import React from "react";
import HelpDropdown from "./Help.jsx";

const NavBar = () => {
	return (
		<nav className="w-full bg-background-800/80">
			<div className="flex justify-between shadow-lg">
				<div className="logo w-52 mx-5">
					<img src="/logo.png" alt="logo" />
				</div>
				<div className="flex flex-row my-auto mr-36 space-x-10 font-bold text-secondary-300 items-center">
					<a href="#">Home</a>
					<HelpDropdown />
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
