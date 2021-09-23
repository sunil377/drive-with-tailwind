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
		<div className="inline-flex flex-wrap">
			<Link
				to="/"
				onClick={handleClick}
				className={rootLinkStyle}
			>
				Root
			</Link>
			{state &&
				state.map((val, index) => {
					if (index < state.length - 3) {
						return (
							<span
								key={val.id}
								title={val.name}
								className="mx-1 font-bold"
							>
								&#10093;...
							</span>
						);
					}
					const active = val.id === currentFolder;

					const linkClass = active
						? " cursor-text"
						: " text-blue-400 hover:text-blue-800 max-w-24 ";

					const to = {
						pathname: `/folders/${val.id}`,
						state: state.slice(
							0,
							state.findIndex((v) => v.id === val.id) +
								1
						),
					};

					return (
						<div
							key={val.id}
							className="inline-flex space-x-1"
						>
							<span className="mx-1 sm:mx-2 font-bold">
								&#10093;
							</span>
							<Link
								onClick={(e) =>
									active && e.preventDefault()
								}
								className={"truncate " + linkClass}
								tabIndex={active ? -1 : 0}
								to={to}
								style={{ maxWidth: "200px" }}
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
