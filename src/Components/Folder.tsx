import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FolderIcon from "@heroicons/react/solid/FolderIcon";

import { database } from "../lib/firebase";
import { useAuth } from "../Contexts/useAuthContext";
import LoadingButton from "./LoadingButton";
import Alert from "./Alert";
import { useLoading } from "../hooks/useLoading";
import { folderType } from "../types/firebaseType";

export default function Folder() {
  const { state } = useLocation<null | { id: string; name: string }[]>();
  const [folders, setFolders] = useState<folderType[]>([]);
  const [error, setError] = useState("");

  const currentUser = useAuth();
  const { id: currentId } = useParams<{ id: string }>();

  const { loading, status, setLoading, setStatus } = useLoading();

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
            setStatus("success");
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setStatus("failed");
            setLoading(false);
          }
        );
    }
  }, [currentId, currentUser, setLoading, setStatus]);

  if (loading && status === "pending") {
    return (
      <div className="flex flex-wrap px-2 py-4 sm:p-6 border-t justify-center">
        <LoadingButton />
      </div>
    );
  }

  if (folders.length === 0 && status === "success") {
    return (
      <div className="flex flex-wrap p-6 border-t">
        <p className="text-sm">No Folder Added</p>
      </div>
    );
  }
  if (error && status === "failed") {
    return (
      <div className="flex flex-wrap px-2 py-4 sm:p-6 border-t">
        <Alert message={error} variant="alert" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap px-2 py-4 sm:p-6 border-t">
      {folders.map(({ name, id }) => {
        const to = {
          pathname: `/folders/${id}`,
          state: state ? [...state, { id, name }] : [{ id, name }],
        };
        return (
          <Link
            to={to}
            key={id}
            className="flex m-1 sm:m-2 p-1 sm:px-2 space-x-1 items-center border 
			border-black text-base sm:text-lg dark:border-white dark:text-white rounded 
			dark:bg-gray-800 hover:bg-black dark:hover:bg-white 
			dark:hover:text-black hover:text-white 
			transition duration-200 ease-in-out"
          >
            <FolderIcon className="h-6 w-6 flex-shrink-0" />
            <span className="truncate w-16 sm:w-full">{name}</span>
          </Link>
        );
      })}
    </div>
  );
}
