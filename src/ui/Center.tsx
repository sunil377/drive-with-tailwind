import { FC } from "react";

const Center: Props = ({ children, className }) => {
	return <div className={"text-center " + className}>{children}</div>;
};

export default Center;

type Props = FC<{
	className?: string;
}>;
