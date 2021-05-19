import { FormEvent, useState } from "react";

import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import style from "../styles/style";

const ForgotPassword = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const currentUser = useAuth();
	const email = useInputChange();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (currentUser && email.value.trim() !== "") {
			setLoading(true);
			Auth.sendPasswordResetEmail(email.value)
				.then(() =>
					setMessage("check your email inbox for further instruction")
				)
				.catch((err) => setError(err.message))
				.finally(() => setLoading(false));
		}
	};
	return (
		<div className="container mt-24">
			<div className={style.card}>
				{error && <h1 className={style.alert}>{error}</h1>}
				{message && <h1 className={style.alertSuccess}>{message}</h1>}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col space-y-4 w-full"
				>
					<input
						type="email"
						aria-label="Enter Email"
						placeholder="Enter Email"
						required
						autoFocus={true}
						{...email}
						className={style.input}
					/>

					<button
						disabled={loading}
						type="submit"
						className={style.btn + style.btnSuccess}
					>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
