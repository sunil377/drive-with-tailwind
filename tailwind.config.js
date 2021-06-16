module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				popup: {
					"0%": { transform: "translateY(-500px) " },
					"100%": { transform: "translateY(0px)" },
				},
			},
			animation: {
				popup: "popup 500ms ease-in-out 1 alternate",
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
			backgroundColor: ["disabled"],
			textColor: ["disabled"],
			cursor: ["disabled"],
			padding: ["focus"],
		},
	},
	plugins: [],
};
