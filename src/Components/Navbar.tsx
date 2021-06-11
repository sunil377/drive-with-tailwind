import { NavLink, useHistory } from "react-router-dom";

import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import ToggleTheme from "./ToggleTheme";

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
		<div className="bg-gray-50 shadow-md dark:bg-gray-800 dark:text-white">
			<div className="container mx-auto">
				<div className="flex justify-between py-2 px-1 sm:px-2 w-full">
					<NavLink to="/" className="navLink">
						<strong>Google Drive Clone</strong>
					</NavLink>

					<div className="inline-flex sm:space-x-4 flex-1 justify-end items-center">
						<ToggleTheme />
						{currentUser ? (
							<>
								<NavLink to="/profile" className="navLink">
									Profile
								</NavLink>

								<button
									onClick={handleClick}
									className="btn btn-outline-primary"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink to="/signup" className="navLink">
									Sign Up
								</NavLink>
								<NavLink to="/login" className="navLink">
									Log In
								</NavLink>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
