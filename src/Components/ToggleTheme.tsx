import { useEffect, useRef, useState } from "react";
import SunIcon from "@heroicons/react/solid/SunIcon";
import MoonIcon from "@heroicons/react/solid/MoonIcon";

const ToggleTheme = () => {
	const [enabled, setEnabled] = useState(false);
	const toggleRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const ht = document.querySelector("html")!;
		if (enabled) {
			ht.setAttribute("class", "dark");
			return;
		}
		ht.removeAttribute("class");
	}, [enabled]);

	return (
		<button
			className="flex sm:inline-flex space-x-2 align-middle items-center py-2 px-2 justify-between cursor-pointer  dark:hover:bg-gray-600  rounded-xl transition "
			onClick={() => setEnabled((prev) => !prev)}
		>
			<span className="sm:hidden">Dark Theme</span>
			<span
				className="border-2 border-green-400 rounded-full overflow-hidden h-6 w-14  cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
				aria-checked={enabled}
				role="checkbox"
				ref={toggleRef}
			>
				<span className="sr-only">Use Dark Theme</span>
				<span
					className={`${
						enabled ? "translate-x-4" : "-translate-x-4"
					} h-5 w-5 bg-green-400 rounded-full inline-block transform transition ease-in-out duration-200 pointer-events-none shadow-lg border border-transparent`}
				></span>
			</span>
		</button>
	);
};

export default ToggleTheme;
