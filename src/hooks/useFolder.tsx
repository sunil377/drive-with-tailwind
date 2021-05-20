import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../Contexts/useAuthContext";
import { database } from "../lib/firebase";

export const useFolder = () => {
	const [folders, setFolders] = useState<folderType[]>([]);
	const [files, setFiles] = useState<fileType[]>([]);
	const [selectedFolder, setSelectedFolder] =
		useState<selectedFolderType>(null);
	const [currentPath, setCurrentPath] = useState<currentPathType>([]);
	const [error, setError] = useState("");

	const currentUser = useAuth();
	const { id: currentId } = useParams<{ id: string }>();

	useEffect(() => {
		if (currentUser) {
			return database.folders
				.where("userId", "==", currentUser.uid)
				.where("parentId", "==", currentId ?? null)
				.orderBy("createdAt", "desc")
				.onSnapshot(
					({ docs }) => {
						const f = docs.map((doc) => {
							const h = doc.data();
							setCurrentPath(h.path);
							const data: folderType = {
								id: doc.id,
								name: h.name,
								parentId: h.parentId,
								userId: h.userId,
								path: h.path,
								createdAt: h.createdAt,
							};
							return data;
						});
						setFolders(f);
					},
					(err) => setError(err.message)
				);
		}
	}, [currentId, currentUser]);

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

	useEffect(() => {
		if (currentUser) {
			return database.files
				.where("userId", "==", currentUser.uid)
				.where("path", "==", currentPath)
				.orderBy("createdAt", "desc")
				.onSnapshot(
					({ docs }) => {
						const f = docs.map((doc) => {
							const data = doc.data();
							return {
								id: doc.id,
								name: data.name,
								url: data.url,
								path: data.path,
								type: data.type,
								userId: data.userId,
							};
						});
						setFiles(f);
					},
					(err) => setError(err.message)
				);
		}
	}, [currentPath, currentUser]);

	useEffect(() => {
		setFiles([]);
		setFolders([]);
	}, [currentId]);

	return {
		folders,
		selectedFolder,
		currentPath,
		files,
		error,
	};
};

export type folderType = {
	id: string;
	name: string;
	parentId: string | null;
	userId: string;
	path: [string];
	createdAt: string;
};

export type selectedFolderType = string | null;
export type currentPathType = string[];

export type fileType = {
	id: string;
	name: string;
	url: string;
	path: [string];
	type: string;
	userId: string;
};
