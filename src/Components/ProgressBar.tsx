import { Dispatch, SetStateAction } from "react";
import { uploadFileType } from "../types/types";
import icon from "../asset/svg";

export default function ProgressBar(props: Props) {
	const { file, setUploadFiles } = props;
	const { failed, paused, upLoadTask, id, name, rate } = file;

	const handleClose = () => {
		const del = window.confirm("Are you Sure");
		if (del) {
			setUploadFiles((prev) => prev.filter((e) => e.id !== id));
			upLoadTask.cancel();
		}
	};

	const handlePause = (value: boolean) =>
		setUploadFiles((prev) =>
			prev.map((e) => {
				return e.id === id ? { ...e, paused: value } : e;
			})
		);

	return (
		<div key={id} className="border-b-2 dark:border-transparent">
			<div className="flex space-y-1">
				<span className="truncate flex-grow">{name}</span>

				{failed ? (
					<button className="text-red-600" onClick={handleClose}>
						<icon.ExclamationCircleIcon className="h-5 w-5 text-red-500" />
					</button>
				) : (
					<button
						onClick={() =>
							paused
								? upLoadTask.resume() && handlePause(false)
								: upLoadTask.pause() && handlePause(true)
						}
						className="text-blue-600"
					>
						{paused ? (
							<icon.PlayIcon className="h-5 w-5 text-indigo-500" />
						) : (
							<icon.PauseIcon className="h-5 w-5 text-red-500" />
						)}
					</button>
				)}
			</div>
			<div
				className="bg-gray-200 dark:bg-white rounded w-full mt-2"
				role="progressbar"
				title="progressbar"
			>
				<div
					className={`${
						failed ? "bg-red-600" : "bg-blue-600"
					} rounded px-2 text-white dark:text-black`}
					style={{ width: Math.round(rate) + "%" }}
				>
					{rate + "%"}
				</div>
			</div>
		</div>
	);
}

interface Props {
	file: uploadFileType;
	setUploadFiles: Dispatch<SetStateAction<uploadFileType[]>>;
}
