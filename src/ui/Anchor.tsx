import { FC } from "react";
import { Link } from "react-router-dom";

const Anchor: Props = ({ to, title, className = "" }) => {
	return (
		<Link
			to={to}
			className={`hover:underline text-indigo-500 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 rounded-md border border-transparent focus:p-2 ${className}`}
		>
			{title}
		</Link>
	);
};

export default Anchor;

type Props = FC<{
	title: string;
	to: string;
	className?: string;
}>;
