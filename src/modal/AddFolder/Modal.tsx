import { SetStateAction } from "react";
import { useState, Dispatch, FormEventHandler } from "react";
import { useAuth } from "../../Contexts/useAuthContext";
import { createFolder } from "../../helper/AddFolder/createFolder";
import { currentPathType } from "../../hooks/useFolder";
import { useInputChange } from "../../hooks/useInputChange";
import style from "../../styles/style";

export default function Modal({
	setShowModal,
	currentFolderId,
	currentPath,
}: Props) {
	const folder = useInputChange();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const currentUser = useAuth();

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		if (currentUser) {
			createFolder({
				currentUser,
				currentPath,
				currentFolderId,
				name: folder.value.toLowerCase(),
			})
				.then(() => {
					setLoading(false);
					setError("");
					setShowModal(false);
				})
				.catch(({ message }) => {
					setError(message);
					setLoading(false);
				});
		}
	};

	return (
		<div className={style.modal}>
			<form onSubmit={handleSubmit} className={style.card}>
				{error && <h1 className={style.alert}>{error}</h1>}
				<input
					type="text"
					aria-label="Enter Folder Name"
					placeholder="Enter Folder Name"
					required
					{...folder}
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
					onClick={() => setShowModal(false)}
					className={style.btn + style.btnSuccess}
				>
					Cancel
				</button>
			</form>
		</div>
	);
}

interface Props {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	currentPath: currentPathType;
	currentFolderId: string | null;
}
