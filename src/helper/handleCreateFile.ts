import { Dispatch, SetStateAction } from "react";
import { database, storage, userType } from "../lib/firebase";
import { uploadFileType } from "../types/types";

export default function handleCreateFile({
	fileList,
	currentPath,
	currentUser,
	setUploadFiles,
}: arg) {
	let path = currentPath.map((path) => path).join("/") + "/";

	const { name, type } = fileList[0];
	const { uid } = currentUser;

	const ref = storage.ref(`files/${uid}/${path ?? ``}${name}`);
	const uplink = ref.put(fileList[0]);

	const uploadData = {
		id: Math.random().toString(),
		name,
		rate: 0,
		failed: false,
		paused: false,
		upLoadTask: uplink,
	};

	setUploadFiles((prevUpload) => [...prevUpload, uploadData]);

	const handleFailed = (id: string) =>
		setUploadFiles((prev) =>
			prev.map((e) => (e.id === id ? { ...e, failed: true } : e))
		);

	const handleRate = (id: string, rate: number) =>
		setUploadFiles((prev) =>
			prev.map((e) => (e.id === id ? { ...e, rate: rate } : e))
		);

	const handleRemove = (id: string) =>
		setUploadFiles((prev) => prev.filter((e) => e.id !== id));

	const unsubscribe = uplink.on(
		"state_changed",
		(snapshot) => {
			const rate = Math.ceil(
				(snapshot.bytesTransferred * 100) / snapshot.totalBytes
			);
			handleRate(uploadData.id, rate);
		},
		() => handleFailed(uploadData.id),
		() => {
			uplink.snapshot.ref
				.getDownloadURL()
				.then((downloadURL) => {
					database.files
						.where("name", "==", name)
						.where("path", "==", currentPath)
						.where("userId", "==", uid)
						.get()
						.then(({ docs }) => {
							if (docs.length > 0) {
								docs[0].ref
									.update({ url: downloadURL })
									.then(() => handleRemove(uploadData.id));
							} else {
								database.files
									.add({
										name,
										url: downloadURL,
										path: currentPath,
										type,
										userId: uid,
										createdAt:
											database.getCurrentTimeStamp(),
									})
									.then(() => {
										handleRemove(uploadData.id);
									})
									.catch(() =>
										uplink.snapshot.ref
											.delete()
											.then(() => {
												handleFailed(uploadData.id);
											})
									);
							}
						});
				})
				.finally(() => unsubscribe());
		}
	);
}

interface arg {
	fileList: FileList;
	currentPath: string[];
	currentUser: userType;
	setUploadFiles: Dispatch<SetStateAction<uploadFileType[]>>;
}
