import { useEffect, useRef, useState } from "react";
import SunIcon from "@heroicons/react/solid/SunIcon";
import MoonIcon from "@heroicons/react/solid/MoonIcon";
import { useCallback } from "react";

const ToggleTheme = () => {
	const [enabled, setEnabled] = useState(false);
	const toggleRef = useRef<HTMLSpanElement>(null);

	const ht = document.querySelector("html")!;

	const keydown = useCallback((e: KeyboardEvent) => {
		if (e.code === "Space") {
			if (document.activeElement === toggleRef.current) {
				setEnabled((prev) => !prev);
				e.preventDefault();
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", keydown);
		return () => window.removeEventListener("keydown", keydown);
	}, [keydown]);

	useEffect(() => {
		if (enabled) {
			ht.setAttribute("class", "dark");
			return;
		}
		ht.removeAttribute("class");
	}, [enabled, ht]);

	return (
		<div className="inline-flex sm:space-x-2 align-middle items-center">
			<SunIcon
				className={`h-4 w-4 sm:h-6 sm:w-6 ${
					enabled ? "text-gray-400" : "text-pink-400"
				}`}
			/>
			<span
				className="border-2 border-green-400 rounded-full overflow-hidden h-6 w-14  cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
				tabIndex={0}
				aria-checked={enabled}
				role="checkbox"
				onClick={() => setEnabled((prev) => !prev)}
				ref={toggleRef}
			>
				<span className="sr-only">Use Dark Theme</span>
				<span
					className={`${
						enabled ? "translate-x-8" : "translate-x-0"
					} h-5 w-5 bg-green-400 rounded-full inline-block transform transition ease-in-out duration-200 pointer-events-none shadow-lg border border-transparent`}
				></span>
			</span>

			<MoonIcon
				className={`h-4 w-4 sm:h-6 sm:w-6 ${
					enabled ? "text-black" : "text-gray-400"
				}`}
			/>
		</div>
	);
};

export default ToggleTheme;
