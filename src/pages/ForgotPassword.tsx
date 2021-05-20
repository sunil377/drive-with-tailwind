import produce from "immer";
import { FormEvent, useState } from "react";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import style from "../styles/style";

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
								"check your email inbox for further instruction";
						})
					)
				)
				.catch((err) =>
					setState(
						produce((prev) => {
							prev.loading = false;
							prev.error = err.message;
						})
					)
				);
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
