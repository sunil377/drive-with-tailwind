import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavAnchor: Props = ({ to, title, className = "" }) => {
	const { pathname } = useLocation();
	return (
		<NavLink
			to={to}
			className={`${className}  ${to === "/" ? "font-bold" : ""}
				${pathname === to ? " font-light  " : ""}
				px-2 text-left block hover:text-indigo-500
				dark:text-white hover:underline focus:outline-none focus:ring-2
				focus:ring-blue-200 focus:border-blue-400 rounded-md`}
		>
			{title}
		</NavLink>
	);
};

export default NavAnchor;

type Props = FC<{
	title: string;
	to: string;
	className?: string;
}>;
