import { FC } from "react";

const AlertComponent: Props = ({ message, variant }) => {
	if (!message) {
		return null;
	}
	return (
		<span role="alert" className={`alert ${variant ?? ""}`}>
			{message}
		</span>
	);
};

export default AlertComponent;

type Props = FC<{
	message: string;
	variant?: string;
}>;
