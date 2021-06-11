import { FormEvent, useState } from "react";
import produce from "immer";

import { Auth } from "../lib/firebase";
import AlertComponent from "../Components/AlertComponent";
import { useInputChange } from "../hooks/useInputChange";

const ForgotPassword = () => {
	const [state, setState] = useState({
		error: "",
		message: "",
		loading: false,
	});

	const { error, loading, message } = state;

	const email = useInputChange();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState(
			produce((prev) => {
				prev.loading = true;
				prev.error = "";
				prev.message = "";
			})
		);

		if (email.value.trim() !== "") {
			Auth.sendPasswordResetEmail(email.value)
				.then(() =>
					setState(
						produce((prev) => {
							prev.loading = false;
							prev.message =
								"Check Your Email INBOX For Further Instruction";
						})
					)
				)
				.catch(({ code, message }) => {
					let val = message;
					if (code === "auth/user-not-found") {
						val = "User Don't Exists";
					}
					setState(
						produce((prev) => {
							prev.loading = false;
							prev.error = val;
						})
					);
				});
		}
	};

	return (
		<div className="container mt-24">
			<div className="card">
				<AlertComponent message={error} />
				<AlertComponent message={message} variant="bg-green-500" />
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
					title="Reset Password"
				>
					<input
						type="email"
						placeholder="Enter Email"
						required
						autoFocus={true}
						{...email}
						className="input"
					/>

					<button
						disabled={loading}
						type="submit"
						className="btn btn-primary block w-full"
						aria-disabled={loading}
					>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
