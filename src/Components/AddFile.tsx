import { ChangeEvent, useState } from "react";
import CloudUploadIcon from "@heroicons/react/solid/CloudUploadIcon";

import { useAuth } from "../Contexts/useAuthContext";
import handleCreateFile from "../helper/handleCreateFile";
import ProgressBar from "./ProgressBar";
import { uploadFileType } from "../types/types";
import { currentPathType } from "../types/firebaseType";

export default function AddFile({ currentPath }: Props) {
  const currentUser = useAuth();
  const [uploadFiles, setUploadFiles] = useState<uploadFileType[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && currentUser) {
      handleCreateFile({
        fileList: event.target.files,
        currentPath,
        currentUser,
        setUploadFiles,
      });
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        className="w-0 h-0 upload"
        onChange={handleChange}
        accept="image/*"
      />
      <label htmlFor="file" className="cursor-pointer mr-4">
        <span className="sr-only">add Image</span>
        <CloudUploadIcon className="h-6 w-6 text-green-500" />
      </label>
      {uploadFiles.length > 0 && (
        <div
          className="fixed w-full max-w-xs right-0 bottom-0 bg-white
				dark:bg-gray-800 shadow-md rounded-md p-5 space-y-2"
        >
          {uploadFiles.map((e) => (
            <ProgressBar file={e} key={e.id} setUploadFiles={setUploadFiles} />
          ))}
        </div>
      )}
    </>
  );
}

interface Props {
  currentPath: currentPathType;
}

// [
// 	{ failed: true, id: "sunil", name: "sunil", paused: false, rate: 50 },
// 	{ failed: false, id: "sunil", name: "sunil", paused: true, rate: 10 },
// 	{ failed: false, id: "sunil", name: "sunil", paused: false, rate: 70 },
// ]
