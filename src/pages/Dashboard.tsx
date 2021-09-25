import { useFolder } from "../hooks/useFolder";

import BreadCrumbs from "../Components/BreadCrumbs";
import AddFolder from "../Components/AddFolder";
import AddFile from "../Components/AddFile";
import Folder from "../Components/Folder";
import File from "../Components/File";

export default function Dashboard() {
  const { selectedFolder, currentPath } = useFolder();

  return (
    <div className="mt-10 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700 border">
      <div className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300 flex flex-row w-full items-center px-2 sm:px-6 py-3">
        <BreadCrumbs currentFolder={selectedFolder ?? ""} />
        <div className="inline-flex w-max">
          <AddFile currentPath={currentPath} />
          <AddFolder
            currentFolderId={selectedFolder}
            currentPath={currentPath}
          />
        </div>
      </div>
      <Folder />
      <File currentPath={currentPath} />
    </div>
  );
}
