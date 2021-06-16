import { useState } from "react";
import Alert from "../Components/Alert";
import { useAuth } from "../Contexts/useAuthContext";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Container from "../ui/Container";

export default function Profile() {
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
		<Container className="container mt-24 ">
			<Card className="card space-y-2 md:space-y-4 ">
				{message && <Alert message={message} variant="success" />}
				{error && <Alert message={error} variant="alert" />}
				<h1 className="text-lg">
					<strong>Profile</strong>
				</h1>

				<h2>
					<strong className="text-blue-600"> Email: </strong>
					<em>{currentUser && currentUser.email}</em>
				</h2>

				{currentUser && currentUser.emailVerified ? (
					<strong>Email verified</strong>
				) : (
					<Button
						title="Verify Email"
						disabled={loading}
						className="block w-full"
						onClick={handleVerifyEmail}
					/>
				)}
			</Card>
		</Container>
	);
}
