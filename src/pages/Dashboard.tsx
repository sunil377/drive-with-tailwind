import { useFolder } from "../hooks/useFolder";

import BreadCrumbs from "../Components/BreadCrumbs";
import AddFolder from "../Components/AddFolder";
import AddFile from "../Components/AddFile";
import Folder from "../Components/Folder";
import File from "../Components/File";

export default function Dashboard() {
	const { folders, selectedFolder, currentPath, files } = useFolder();

	return (
		<div className="container mx-auto mt-10">
			<div className="bg-gray-50 shadow-lg flex w-full justify-between items-center px-6 py-3 rounded-md">
				<BreadCrumbs currentFolder={selectedFolder ?? ""} />

				<div className="flex flex-shrink-0">
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
