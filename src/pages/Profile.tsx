import { useEffect, useState } from "react";

import AlertComponent from "../Components/AlertComponent";
import { useAuth } from "../Contexts/useAuthContext";

export default function Profile() {
	useEffect(() => {
		document.title = "Profile - Google Drive";
	}, []);

	const [state, setState] = useState({
		error: "",
		message: "",
		loading: false,
	});

	const currentUser = useAuth();

	const handleVerifyEmail = async () => {
		setState({
			error: "",
			loading: true,
			message: "",
		});
		if (currentUser) {
			try {
				await currentUser.sendEmailVerification();
				setState((prev) => ({
					...prev,
					message: "Check your Email inbox for further instructions",
					loading: false,
				}));
			} catch ({ message }) {
				setState((prev) => ({
					...prev,
					error: message,
					loading: false,
				}));
			}
		}
	};
	const { error, loading, message } = state;

	return (
		<div className="container mt-24 ">
			<div className="card space-y-2 md:space-y-4 ">
				<h1 className="text-lg">
					<strong>Profile</strong>
				</h1>
				<h2 className="">
					<strong className="text-blue-600"> Email: </strong>
					<em>{currentUser && currentUser.email}</em>
				</h2>

				{currentUser && currentUser.emailVerified ? (
					<strong>Email verified</strong>
				) : (
					<button
						disabled={loading}
						className="btn btn-primary w-full"
						onClick={handleVerifyEmail}
					>
						Verify Email
					</button>
				)}

				<AlertComponent message={error} />
				<AlertComponent message={message} variant="bg-green-500" />
			</div>
		</div>
	);
}
