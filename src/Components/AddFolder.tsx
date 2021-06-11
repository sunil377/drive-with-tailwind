import { useState } from "react";
import { Dialog } from "@headlessui/react";

import Modal from "../modal/AddFolder/Modal";
import icon from "../asset/svg";

export default function AddFolder({ currentFolderId, currentPath }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsOpen(true)}>
				<span className="sr-only">Add Folder</span>
				<icon.FolderAddIcon className="h-5 w-5 text-green-500" />
			</button>

			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Overlay />
				<Modal
					setShowModal={setIsOpen}
					currentFolderId={currentFolderId}
					currentPath={currentPath}
				/>
			</Dialog>
		</>
	);
}

interface Props {
	currentFolderId: string | null;
	currentPath: string[];
}
