import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavAnchor: Props = ({ to, title }) => {
	const { pathname } = useLocation();
	return (
		<NavLink
			to={to}
			className={`sm:p-2 inline-block hover:text-indigo-500 dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 rounded-md  ${
				to === "/" && "font-bold"
			} ${pathname === to && "font-light"}`}
		>
			{title}
		</NavLink>
	);
};

export default NavAnchor;

type Props = FC<{
	title: string;
	to: string;
}>;
