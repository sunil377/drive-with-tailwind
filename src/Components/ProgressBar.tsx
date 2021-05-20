import { Dispatch, SetStateAction } from "react";
import { uploadFileType } from "../types/types";

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
		<div key={id} className="border-b-2">
			<div className="flex space-y-1 ">
				<span className="truncate flex-grow">{name}</span>
				{!failed && (
					<button
						onClick={() =>
							paused
								? upLoadTask.resume() && handlePause(false)
								: upLoadTask.pause() && handlePause(true)
						}
						className="text-blue-600"
					>
						{paused ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						)}
					</button>
				)}
				{failed && (
					<button className="text-red-600" onClick={handleClose}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				)}
			</div>

			<div
				className="bg-gray-200 rounded w-full mt-2"
				role="progressbar"
				title="progressbar"
			>
				<div
					className={`${
						failed ? "bg-red-600" : "bg-blue-600"
					} rounded px-2 text-white`}
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
