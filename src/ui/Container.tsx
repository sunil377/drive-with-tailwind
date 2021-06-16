import { FC } from "react";

const Container: Props = ({ children, className = "" }) => {
	return <div className={"container mx-auto " + className}>{children}</div>;
};

export default Container;

type Props = FC<{
	className?: string;
}>;
