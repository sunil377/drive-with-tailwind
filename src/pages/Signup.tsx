import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useSetAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import style from "../styles/style";

export default function Signup() {
	const email = useInputChange();
	const password = useInputChange();
	const confirmPassword = useInputChange();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const setCurrentUser = useSetAuth();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if (
			email.value.trim() &&
			password.value.trim() &&
			confirmPassword.value.trim()
		) {
			if (password.value !== confirmPassword.value) {
				setLoading(false);
				return setError("Password don't match");
			}

			Auth.createUserWithEmailAndPassword(email.value, password.value)
				.then(({ user }) => {
					setCurrentUser && setCurrentUser(user);
					history.push("/");
				})
				.catch(({ message }) => {
					setError(message);
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
						{...email}
						aria-label="enter email"
						placeholder="Enter Email"
						autoFocus={true}
						required
						className={style.input}
					/>
					<input
						type="password"
						{...password}
						required
						aria-label="enter password"
						placeholder="Enter Password"
						className={style.input}
					/>
					<input
						type="password"
						aria-label="enter confirm password"
						placeholder="Enter Confirm Password"
						{...confirmPassword}
						className={style.input}
					/>
					<button
						disabled={loading}
						type="submit"
						className={style.btn + style.btnPrimary}
					>
						Signup
					</button>
				</form>

				<div className="text-center">
					<span className="text-sm font-light">
						Already have a Account
					</span>
					<Link to="/login" className={style.link}>
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
}
