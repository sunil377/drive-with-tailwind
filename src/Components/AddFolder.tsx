import { useState } from "react";
import { createPortal } from "react-dom";
import { addFolderIcon } from "../asset/svg";
import Modal from "../modal/AddFolder/Modal";

export default function AddFolder({ currentFolderId, currentPath }: Props) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button onClick={() => setShowModal(true)}>
				<span className="sr-only">open Modal for Adding Folder</span>
				{addFolderIcon}
			</button>

			{showModal &&
				createPortal(
					<Modal
						setShowModal={setShowModal}
						currentFolderId={currentFolderId}
						currentPath={currentPath}
					/>,
					document.body
				)}
		</>
	);
}

interface Props {
	currentFolderId: string | null;
	currentPath: string[];
}
