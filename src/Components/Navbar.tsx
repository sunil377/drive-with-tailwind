import { useHistory } from "react-router-dom";

import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import Button from "../ui/Button";
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
					<div className="inline-flex space-x-2 sm:space-x-4 flex-1 justify-end items-center">
						<ToggleTheme />

						{currentUser ? (
							<>
								<NavAnchor to="/profile" title="Profile" />
								<Button
									onClick={handleClick}
									title="Logout"
									className="ml-1"
								/>
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
