import { FC } from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/useAuthContext";
import { useLoading } from "../hooks/useLoading";
import { database } from "../lib/firebase";
import { fileType, currentPathType } from "../types/firebaseType";
import ImagePlaceholder from "./ImagePlaceholder";
import LoadingButton from "./LoadingButton";

export default function File({ currentPath }: Props) {
	const [files, setFiles] = useState<fileType[]>([]);
	const [error, setError] = useState("");
	const currentUser = useAuth();

	const { loading, status, setLoading, setStatus } = useLoading();

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
								thumbURL: data.thumbURL,
								path: data.path,
								type: data.type,
								userId: data.userId,
							};
						});
						setFiles(f);
						setLoading(false);
						setStatus("success");
					},
					(err) => {
						setError(err.message);
						setLoading(false);
						setStatus("failed");
					}
				);
		}
	}, [currentPath, currentUser, setLoading, setStatus]);

	if (loading && status === "pending") {
		return (
			<div className="flex flex-wrap px-2 py-4 sm:p-6 border-t justify-center">
				<LoadingButton />
			</div>
		);
	}

	if (files.length === 0 && status === "success") {
		return (
			<div className="p-6 border-t text-sm">
				<span>No File Added </span>
			</div>
		);
	}

	if (status === "failed") {
		return (
			<div className="p-6 border-t">
				<span>{error} </span>
			</div>
		);
	}

	return (
		<div className="flex px-2 py-4 sm:p-6 border-t flex-wrap space-y-1">
			{files.map((file) => (
				<a
					href={file.url}
					target="_Blank"
					className="w-32 md:w-36 flex-shrink"
					key={file.id}
				>
					<ImageComponent file={file} />
				</a>
			))}
		</div>
	);
}

interface Props {
	currentPath: currentPathType;
}

const ImageComponent: FC<{
	file: fileType;
}> = ({ file: { thumbURL } }) => {
	const [loading, setLoading] = useState(true);
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const img = new Image();
		img.src = thumbURL;
		img.classList.add("rounded-md");
		img.classList.add("mx-auto");

		const load = (e: Event) => {
			setLoading(false);
			mainRef.current?.appendChild(img);
		};

		img.addEventListener("load", load);
		return () => img.removeEventListener("load", load);
	}, [setLoading, thumbURL]);

	return <div ref={mainRef}>{loading && <ImagePlaceholder />}</div>;
};
