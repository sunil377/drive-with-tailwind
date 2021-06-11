import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

import icon from "../asset/svg";

const ToggleTheme = () => {
	const [enabled, setEnabled] = useState(false);
	const ht = document.getElementsByTagName("html")[0];
	useEffect(() => {
		if (enabled) {
			ht.setAttribute("class", "dark");
			return;
		}
		ht.removeAttribute("class");
	}, [enabled, ht]);
	return (
		<div className="inline-flex sm:space-x-2">
			<icon.SunIcon
				className={`h-6 w-6 ${
					enabled ? "text-gray-400" : "text-pink-400"
				}`}
			/>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${enabled ? "bg-black" : "bg-green-400"}
    relative inline-flex flex-shrink-0 h-7 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Use Dark Theme</span>
				<span
					aria-hidden="true"
					className={`${enabled ? "translate-x-6" : "translate-x-0"}
      pointer-events-none inline-block h-6 w-7 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
				/>
			</Switch>
			<icon.MoonIcon
				className={`h-6 w-6 ${
					enabled ? "text-black" : "text-gray-400"
				}`}
			/>
		</div>
	);
};

export default ToggleTheme;
