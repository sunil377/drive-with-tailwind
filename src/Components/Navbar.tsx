import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import style from "../styles/style";

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
		<div className="bg-gray-50 shadow-md">
			<div className="container mx-auto">
				<div className="flex justify-between p-2 w-full">
					<NavLink to="/" className={style.navLink}>
						<strong>Google Drive Clone</strong>
					</NavLink>

					<div className="flex space-x-4 ">
						{currentUser ? (
							<>
								<NavLink
									to="/profile"
									className={style.navLink}
								>
									Profile
								</NavLink>

								<button
									onClick={handleClick}
									className={style.navLink}
								>
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink to="/signup" className={style.navLink}>
									Sign Up
								</NavLink>
								<NavLink to="/login" className={style.navLink}>
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
