import { forwardRef, Ref } from "react";
import { FC } from "react";

const Button: Props = forwardRef(
	(
		{
			title,
			sm,
			md,
			variant = "primary",
			disabled = false,
			className = "",
			dark,
			type = "button",
			tabIndex = 0,
			id,
			active = "false",
			onClick = () => {},
		},
		ref
	) => {
		const small = sm ? sm.split(" ").map((val) => `sm:${val}`) : "";
		const medium = md ? md.split(" ").map((val) => `md:${val}`) : "";
		const theme = dark ? dark.split(" ").map((val) => `dark:${val}`) : "";

		let subClass = "";

		switch (variant) {
			case "primary":
				subClass =
					"border-transparent hover:border-indigo-500 text-white  hover:text-indigo-500 bg-indigo-500 hover:bg-white dark:hover:bg-white dark:hover:border-transparent disabled:text-white disabled:bg-indigo-500 ";
				break;
			case "danger":
				subClass =
					"border-transparent hover:border-red-500 text-white hover:text-red-500 bg-red-500 hover:bg-white dark:hover:bg-white disabled:text-white disabled:bg-red-500 dark:hover:border-transparent";
				break;
			case "success":
				subClass =
					"border-transparent hover:border-green-500 text-white  hover:text-green-500 bg-green-500 hover:bg-white dark:hover:bg-white disabled:text-white disabled:bg-green-500 ";
				break;
			case "outline-primary":
				subClass =
					"border-indigo-500 hover:border-transparent text-indigo-500 disabled:text-indigo-500 hover:text-white dark:hover:text-gray-300 hover:bg-indigo-500 ";
				break;
			case "outline-secondary":
				subClass =
					"border-gray-800 hover:border-transparent text-black  dark:text-gray-300 hover:text-white  bg-white hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-500 disabled:text-gray-800 disabled:bg-white ";
				break;
			default:
				subClass = "";
		}

		return (
			<button
				onClick={onClick}
				disabled={disabled}
				type={type}
				className={` px-4 py-2 rounded-md border text-sm disabled:cursor-not-allowed disabled:opacity-50 transition duration-200 ease-in-out ${small} ${medium} ${subClass} ${className} ${theme}`}
				tabIndex={tabIndex}
				id={id}
				data-active={active}
				ref={ref}
			>
				{title}
			</button>
		);
	}
);

export default Button;

type variant =
	| "primary"
	| "danger"
	| "success"
	| "outline-primary"
	| "outline-secondary";

type Props = FC<{
	title: string;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit";
	sm?: string;
	md?: string;
	dark?: string;
	variant?: variant;
	tabIndex?: 0 | -1 | 1;
	id?: string;
	active?: string;
	ref?: Ref<HTMLButtonElement>;
	onClick?: () => void;
}>;
