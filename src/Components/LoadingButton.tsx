import { FC } from "react";

const LoadingButton: Props = (props) => {
	return (
		<button className="inline-flex items-center space-x-2">
			<span className="h-5 w-5 border-t-0 border-2 border-indigo-600 inline-block rounded-full  animate-spin "></span>
		</button>
	);
};

export default LoadingButton;

type Props = FC<{}>;
