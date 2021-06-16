import { currentPathType } from "../../hooks/useFolder";
import { database, userType } from "../../lib/firebase";

export const createFolder = ({
	currentUser,
	currentPath,
	name,
	currentFolderId,
}: Props) => {
	return database.folders
		.where("path", "==", currentPath)
		.where("userId", "==", currentUser.uid)
		.where("name", "==", name.toLowerCase())
		.get()
		.then(({ docs }) =>
			docs.forEach((doc) => {
				if (doc.exists) {
					throw new Error(`*${name} Folder Name  Already Exists`);
				}
			})
		)
		.then(() =>
			database.folders.add({
				name: name,
				userId: currentUser.uid,
				parentId: currentFolderId,
				path: currentPath,
				createdAt: database.getCurrentTimeStamp(),
			})
		);
};

interface Props {
	currentUser: userType;
	currentPath: currentPathType;
	currentFolderId: string | null;
	name: string;
}
