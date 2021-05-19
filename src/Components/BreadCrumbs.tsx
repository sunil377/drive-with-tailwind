import { MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";
import { State } from "../types/types";

export default function BreadCrumbs({ currentFolder }: Props) {
	const { state, pathname } = useLocation<null | State>();

	const handleClick: handlechange = (e) => {
		pathname === "/" && e.preventDefault();
	};

	const rootLinkStyle =
		pathname === "/"
			? "cursor-text"
			: " text-blue-400 hover:text-blue-800 ";

	return (
		<div className="flex">
			<Link to="/" onClick={handleClick} className={rootLinkStyle}>
				Root
			</Link>

			{state &&
				state.map((val) => {
					const active = val.id === currentFolder;

					const linkClass = active
						? "cursor-text"
						: " text-blue-400 hover:text-blue-800";

					const divClass = active ? "" : " truncate w-32 ";

					const to = {
						pathname: `/folders/${val.id}`,
						state: state.slice(
							0,
							state.findIndex((v) => v.id === val.id) + 1
						),
					};

					return (
						<div key={val.id} className={divClass}>
							<span className="mx-2">&#10093;</span>
							<Link
								onClick={(e) => active && e.preventDefault()}
								className={linkClass}
								to={to}
							>
								{val.name}
							</Link>
						</div>
					);
				})}
		</div>
	);
}

interface Props {
	currentFolder: string;
}

type handlechange = MouseEventHandler<HTMLAnchorElement>;
