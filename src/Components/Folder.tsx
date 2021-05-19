import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { folderIcon } from "../asset/svg";
import { folderType } from "../hooks/useFolder";
import style from "../styles/style";

export default function Folder({ folders }: Props): JSX.Element | null {
	const { state } = useLocation<null | { id: string; name: string }[]>();

	if (folders.length === 0) {
		return null;
	}

	return (
		<div className="bg-white rounded-md flex flex-wrap p-6 shadow-md border-t">
			{folders.map(({ name, id }) => {
				const to = {
					pathname: `/folders/${id}`,
					state: state ? [...state, { id, name }] : [{ id, name }],
				};
				return (
					<Link
						to={to}
						key={id}
						className={style.folder}
						style={{ maxWidth: "200px" }}
					>
						{folderIcon}
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
