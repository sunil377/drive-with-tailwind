import { FC } from "react";

const Alert: Props = ({ message, variant }) => {
	let type = variant === "alert" ? "bg-red-400" : "bg-green-400";
	return (
		<div
			role="alert"
			className={`${type} text-white text-sm py-2 text-center rounded-md`}
		>
			{message}
		</div>
	);
};

export default Alert;

type Props = FC<{
	message: string;
	variant: "alert" | "success";
}>;
