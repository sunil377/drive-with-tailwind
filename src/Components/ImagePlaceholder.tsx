import { FC } from "react";
import LoadingButton from "./LoadingButton";

const ImagePlaceholder: Props = (props) => {
	return (
		<div className="flex justify-center border bg-gray-300 w-28 h-10">
			<LoadingButton />
		</div>
	);
};

export default ImagePlaceholder;

type Props = FC<{}>;
