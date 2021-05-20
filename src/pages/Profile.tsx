import produce from "immer";
import { useState } from "react";
import { useAuth } from "../Contexts/useAuthContext";
import style from "../styles/style";

export default function Profile() {
	const [state, setState] = useState({
		error: "",
		message: "",
		loading: false,
	});

	const currentUser = useAuth();

	const handleVerifyEmail = async () => {
		setState(
			produce((prev) => {
				prev.error = "";
				prev.loading = true;
				prev.message = "";
			})
		);

		if (currentUser) {
			try {
				await currentUser.sendEmailVerification();

				setState(
					produce((prev) => {
						prev.message =
							"Check your Email inbox for further instructions";
						prev.loading = false;
					})
				);
			} catch ({ message }) {
				setState(
					produce((prev) => {
						prev.error = message;
						prev.loading = false;
					})
				);
			}
		}
	};
	const { error, loading, message } = state;

	return (
		<div className="container mt-24">
			<div className={style.card}>
				<h1 className="text-lg">
					<strong>Profile</strong>
				</h1>
				<h1 className="">
					<strong className="text-blue-600"> Email: </strong>
					<em>{currentUser && currentUser.email}</em>
				</h1>

				{currentUser && currentUser.emailVerified ? (
					<strong>Email verified</strong>
				) : (
					<button
						disabled={loading}
						className={style.btn + style.btnPrimary}
						onClick={handleVerifyEmail}
					>
						Verify Email
					</button>
				)}

				{error && <h1 className={style.alert}>{error}</h1>}
				{message && <h1 className={style.alertSuccess}>{message}</h1>}
			</div>
		</div>
	);
}
