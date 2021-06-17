import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { selectedFolderType, currentPathType } from "../types/firebaseType";

export const useFolder = () => {
	const [selectedFolder, setSelectedFolder] =
		useState<selectedFolderType>(null);
	const [currentPath, setCurrentPath] = useState<currentPathType>([]);

	const { id: currentId } = useParams<{ id: string }>();

	useEffect(() => {
		setSelectedFolder(currentId ?? null);
		if (!currentId) {
			setCurrentPath([]);
		} else {
			setCurrentPath((prev) => {
				const i = prev.findIndex((val: string) => val === currentId);
				return i > -1 ? prev.slice(0, i + 1) : [...prev, currentId];
			});
		}
	}, [currentId]);

	return {
		selectedFolder,
		currentPath,
	};
};
