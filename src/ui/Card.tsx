import { FC } from "react";

const Card: Props = ({ children, className = "" }) => {
	return (
		<div
			className={` p-5 sm:p-6 shadow-lg bg-white dark:bg-gray-800 dark:text-gray-300 max-w-xs sm:max-w-md mx-auto rounded-lg border border-transparent ${className} `}
		>
			{children}
		</div>
	);
};

export default Card;

type Props = FC<{
	className?: string;
}>;
