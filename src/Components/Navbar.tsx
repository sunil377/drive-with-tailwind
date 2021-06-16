import { useHistory } from "react-router-dom";

import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import Container from "../ui/Container";
import NavAnchor from "../ui/NavAnchor";
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
			<Container>
				<div className="flex justify-between py-4 px-1 sm:px-2 w-full">
					<NavAnchor to="/" title="Google Drive Clone" />
					<div className="inline-flex sm:space-x-4 flex-1 justify-end items-center">
						<ToggleTheme />
						{currentUser ? (
							<>
								<NavAnchor to="/profile" title="Profile" />
								<button
									onClick={handleClick}
									className="btn btn-outline-primary"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<NavAnchor to="/signup" title="Sign Up" />
								<NavAnchor to="/login" title="Log In" />
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}
