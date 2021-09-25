import { useState, useRef, MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import FolderAddIcon from "@heroicons/react/solid/FolderAddIcon";
import Modal from "./Modal/Modal";

export default function AddFolder({ currentFolderId, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsOpen(true);
    e.preventDefault();
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
          document.body
        )}
    </>
  );
}

interface Props {
  currentFolderId: string | null;
  currentPath: string[];
}
