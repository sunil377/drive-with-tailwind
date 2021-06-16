import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import FolderAddIcon from "@heroicons/react/solid/FolderAddIcon";
import Modal from "./Modal";

export default function AddFolder({ currentFolderId, currentPath }: Props) {
	const [isOpen, setIsOpen] = useState(true);

	const btnRef = useRef<HTMLButtonElement>(null);

	const handleClick = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
		btnRef.current?.focus();
	};

	return (
		<>
			<button onClick={handleClick} ref={btnRef}>
				<span className="sr-only">Add Folder</span>
				<FolderAddIcon className="h-5 w-5 text-green-500" />
			</button>
			{isOpen &&
				createPortal(
					<Modal
						currentFolderId={currentFolderId}
						currentPath={currentPath}
						show={isOpen}
						handleClose={handleClose}
					/>,
					document.getElementById("modal")!
				)}
		</>
	);
}

interface Props {
	currentFolderId: string | null;
	currentPath: string[];
}
