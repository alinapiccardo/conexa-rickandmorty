/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				sm: "480px",
				md: "768px",
				lg: "976px",
				xl: "1440px",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				background: colors.cyan,
				primary: colors.teal,
				secondary: colors.emerald,
				text: colors.slate,
			},
		},
	},
	plugins: [],
};
