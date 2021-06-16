import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { folderType } from "../hooks/useFolder";
import FolderIcon from "@heroicons/react/solid/FolderIcon";

export default function Folder({ folders }: Props): JSX.Element | null {
	const { state } = useLocation<null | { id: string; name: string }[]>();

	if (folders.length === 0) {
		return null;
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
						className="flex m-1 sm:m-2 space-x-1 items-center border border-black  dark:border-white dark:text-white rounded-md p-1 dark:bg-gray-800 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition duration-200 ease-in-out transform sc"
					>
						<FolderIcon className="h-5 w-5 flex-shrink-0" />
						<span className="truncate w-16 sm:w-20 text-sm">
							{name}
						</span>
					</Link>
				);
			})}
		</div>
	);
}

interface Props {
	folders: folderType[];
}
