import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSetAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import style from "../styles/style";

export default function Login() {
	const email = useInputChange();
	const password = useInputChange();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const history = useHistory();

	const setCurrentUser = useSetAuth();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if (email.value.trim() && password.value.trim()) {
			Auth.signInWithEmailAndPassword(email.value, password.value)
				.then(({ user }) => {
					setCurrentUser && setCurrentUser(user);
					history.push("/");
				})
				.catch((err) => {
					let errMessage = err.message;
					if (err.code === "auth/wrong-password") {
						errMessage = "Wrong Password";
					}
					setError(errMessage);
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	};

	return (
		<div className="container mt-24">
			<div className={style.card}>
				{error && <h1 className={style.alert}>{error}</h1>}
				<form
					className="flex flex-col space-y-3"
					onSubmit={handleSubmit}
				>
					<input
						type="email"
						aria-label="enter email"
						placeholder="Enter Email"
						className={style.input}
						{...email}
						autoFocus
						required
					/>

					<input
						type="password"
						aria-label="enter password"
						placeholder="Enter Password"
						className={style.input}
						{...password}
						required
					/>
					<button
						type="submit"
						className={style.btn + style.btnPrimary}
						disabled={loading}
					>
						Log In
					</button>
				</form>
				<div className="text-center">
					<Link
						to="/forgotpassword"
						className={style.link + " text-sm "}
					>
						Forgotten Password ?
					</Link>
				</div>
				<hr />
				<Link
					to="/signup"
					className={style.btn + style.btnSuccess + " mx-auto px-4 "}
				>
					Create New Account
				</Link>
			</div>
		</div>
	);
}
