import { useFolder } from "../hooks/useFolder";

import BreadCrumbs from "../Components/BreadCrumbs";
import AddFolder from "../Components/AddFolder";
import AddFile from "../Components/AddFile";
import Folder from "../Components/Folder";
import File from "../Components/File";

export default function Dashboard() {
	const { folders, selectedFolder, currentPath, files } = useFolder();

	return (
		<div className="container mx-auto mt-10 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-700">
			<div className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300 inline-flex w-full justify-between items-center px-2 sm:px-6 py-3">
				<BreadCrumbs currentFolder={selectedFolder ?? ""} />
				<div className="inline-flex">
					<AddFile currentPath={currentPath} />
					<AddFolder
						currentFolderId={selectedFolder}
						currentPath={currentPath}
					/>
				</div>
			</div>

			<Folder folders={folders} />
			<File files={files} />
		</div>
	);
}
