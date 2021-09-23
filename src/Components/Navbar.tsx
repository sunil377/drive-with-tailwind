import { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@heroicons/react/solid/MenuIcon";

import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import Container from "../ui/Container";

import Menu from "../ui/menu/Menu";
import { Switch } from "../ui/Switch";

export default function Navbar() {
	const currentUser = useAuth();
	const history = useHistory();

	const handleClick = () => {
		if (currentUser) {
			Auth.signOut()
				.then(() => history.push("/login"))
				.catch((err) => alert(err.message));
		}
	};

	return (
		<nav className="border-b relative">
			<Container>
				<div className="flex justify-between py-2 items-center">
					<Link
						to="/"
						className="px-2 sm:px-4 py-2 border-2
						rounded-full
						border-transparent
						focus:outline-none
						focus:border-blue-100
						focus:bg-blue-50"
					>
						<strong>Google Drive</strong>
					</Link>
					<ul className="sm:flex justify-end flex-1 text-sm items-center hidden ">
						<Switch className="px-4 mt-2 focus:ring focus:ring-blue-600 focus:outline-none rounded-full flex space-x-2 " />

						{currentUser ? (
							<>
								<NavbarAnchor to="/profile">
									Profile
								</NavbarAnchor>

								<button>Logout</button>
							</>
						) : (
							<>
								<NavbarAnchor to="/signup">
									Signup
								</NavbarAnchor>

								<NavbarAnchor to="/login">
									Login
								</NavbarAnchor>
							</>
						)}
					</ul>
					<Menu className="sm:hidden">
						<Menu.Button>
							<MenuIcon className="h-5 w-5" />
						</Menu.Button>
						<Menu.Items className="w-6/12 mx-auto absolute right-5 top-16 h-40 rounded-lg overflow-hidden shadow-xl border py-4 px-4 bg-white text-sm dark:bg-black dark:text-white">
							{currentUser ? (
								<>
									<Menu.Item>
										<Link
											to="/profile"
											className={`focus:bg-indigo-500 focus:text-white px-4 py-2 block focus:outline-none rounded-xl`}
										>
											Profile
										</Link>
									</Menu.Item>
									<Menu.Item>
										<button
											onClick={handleClick}
											className={`focus:bg-indigo-500 focus:text-white px-4 py-2 block focus:outline-none rounded-xl w-full text-left`}
										>
											Logout
										</button>
									</Menu.Item>
								</>
							) : (
								<>
									<Menu.Item>
										<Link
											to="/signup"
											className={`focus:bg-indigo-500 focus:text-white px-4 py-2 block focus:outline-none rounded-xl`}
										>
											Signup
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link
											to="/login"
											className={`focus:bg-indigo-500 focus:text-white px-4 py-2 block focus:outline-none rounded-xl`}
										>
											Login
										</Link>
									</Menu.Item>
								</>
							)}
							<Menu.Item>
								<Switch className=" mt-2 focus:bg-indigo-500  px-4 py-2 focus:outline-none rounded-full flex justify-between w-full" />
							</Menu.Item>
						</Menu.Items>
					</Menu>
				</div>
			</Container>
		</nav>
	);
}

const NavbarAnchor: FC<{ to: string }> = ({ children, to }) => {
	return (
		<li>
			<Link
				to={to}
				className=" px-2 py-2 sm:px-4 focus:outline-none rounded-full border-2 border-transparent focus:border-blue-100 focus:bg-blue-50"
			>
				{children}
			</Link>
		</li>
	);
};
