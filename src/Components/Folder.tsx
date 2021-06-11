import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { folderType } from "../hooks/useFolder";
import icon from "../asset/svg";

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
						className="btn btn-outline-secondary flex m-1 sm:m-2 space-x-1 items-center"
						style={{ maxWidth: "200px" }}
					>
						<icon.FolderIcon className="h-5 w-5 flex-shrink-0" />
						<span className="truncate">{name}</span>
					</Link>
				);
			})}
		</div>
	);
}

interface Props {
	folders: folderType[];
}
