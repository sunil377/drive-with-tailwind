import { FormEventHandler } from "react";
import { useState, useRef } from "react";
import { addFolderIcon } from "../asset/svg";

import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { database } from "../lib/firebase";
import style from "../styles/style";

export default function AddFolder({ currentFolderId, currentPath }: Props) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const folderRef = useRef<HTMLInputElement>(null);
	const currentUser = useAuth();

	const folderName = useInputChange();

	const handleModalShow = () => {
		setShowModal(true);
		setTimeout(() => {
			folderRef.current && folderRef.current.focus();
		}, 0);
	};

	const handleModalClose = () => {
		setShowModal(false);
		setError("");
	};

	const handleModalSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		if (currentUser) {
			database.folders
				.where("path", "==", currentPath)
				.where("userId", "==", currentUser.uid)
				.where("name", "==", folderName.value)
				.get()
				.then(({ docs }) =>
					docs.forEach((doc) => {
						if (doc.exists) {
							throw new Error(
								`*${folderName.value} folder name  already exists`
							);
						}
					})
				)
				.then(() => {
					database.folders
						.add({
							name: folderName.value,
							userId: currentUser.uid,
							parentId: currentFolderId,
							path: currentPath,
							createdAt: database.getCurrentTimeStamp(),
						})
						.then(handleModalClose)
						.catch(setError);
				})
				.catch(setError)
				.finally(() => setLoading(false));
		}
	};

	return (
		<>
			<button onClick={handleModalShow}>
				<span className="sr-only">open Modal for Adding Folder</span>
				{addFolderIcon}
			</button>

			{showModal && (
				<div className={style.modal}>
					<form onSubmit={handleModalSubmit} className={style.card}>
						{error && <h1 className={style.alert}>{error}</h1>}
						<input
							type="text"
							aria-label="Enter Folder Name"
							placeholder="Enter Folder Name"
							required
							ref={folderRef}
							{...folderName}
							autoFocus={true}
							className={style.input}
						/>
						<button
							type="submit"
							disabled={loading}
							className={style.btn + style.btnPrimary}
						>
							Add Folder
						</button>
						<button
							onClick={handleModalClose}
							className={style.btn + style.btnSuccess}
						>
							Cancel
						</button>
					</form>
				</div>
			)}
		</>
	);
}

interface Props {
	currentFolderId: string | null;
	currentPath: string[];
}
