import { ChangeEvent, useState } from "react";
import { uploadFileIcon } from "../asset/svg";
import { useAuth } from "../Contexts/useAuthContext";
import { currentPathType } from "../hooks/useFolder";
import handleCreateFile from "../helper/handleCreateFile";
import ProgressBar from "./ProgressBar";
import { uploadFileType } from "../types/types";

export default function AddFile({ currentPath }: Props) {
	const currentUser = useAuth();
	const [uploadFiles, setUploadFiles] = useState<uploadFileType[]>([]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (
			event.target.files &&
			event.target.files.length > 0 &&
			currentUser
		) {
			handleCreateFile({
				fileList: event.target.files,
				currentPath,
				currentUser,
				setUploadFiles,
			});
		}
	};

	return (
		<>
			<input
				type="file"
				id="file"
				className="w-0 h-0 upload"
				onChange={handleChange}
				accept="image/*"
			/>
			<label htmlFor="file" className="cursor-pointer mr-2">
				<span className="sr-only">add Image</span>
				{uploadFileIcon}
			</label>
			{uploadFiles.length > 0 && (
				<div className="fixed w-full max-w-xs right-0 bottom-0 bg-white shadow-md rounded-md p-5 flex-col space-y-2">
					{uploadFiles.map((e) => (
						<ProgressBar
							file={e}
							key={e.id}
							setUploadFiles={setUploadFiles}
						/>
					))}
				</div>
			)}
		</>
	);
}

interface Props {
	currentPath: currentPathType;
}
