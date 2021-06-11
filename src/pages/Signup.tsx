import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";

import AlertComponent from "../Components/AlertComponent";
import InputField from "../Components/InputField";

import { SIGNUPFIELD } from "../constant/fields";
import { SIGNUPSCHEMA } from "../constant/schema";

import { useSetAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";

export default function Signup() {
	const [error, setError] = useState("");

	const history = useHistory();
	const setCurrentUser = useSetAuth();

	useEffect(() => {
		document.title = "Sign Up - Google Drive";
	}, []);

	const handleSubmit: handleSubmitType = (
		{ email, password, confirmPassword },
		{ setSubmitting, setErrors }
	) => {
		if (password === confirmPassword) {
			Auth.createUserWithEmailAndPassword(email, password)
				.then(({ user }) => {
					setCurrentUser && setCurrentUser(user);
					history.push("/");
				})
				.catch(({ message, code }) => {
					let val = message;
					if (code === "auth/email-already-in-use") {
						val = "User Already Exists";
					}
					setError(val);
					setSubmitting(false);
				});
		} else {
			setErrors({
				password: "*Password Don't Match",
				confirmPassword: "*Password Don't Match",
			});
			setSubmitting(false);
		}
	};

	return (
		<div className="container mt-24">
			<div className="card space-y-2">
				<AlertComponent message={error} />
				<Formik
					initialValues={{
						email: "",
						password: "",
						confirmPassword: "",
					}}
					validationSchema={SIGNUPSCHEMA}
					onSubmit={handleSubmit}
				>
					{({ errors, isSubmitting }) => (
						<Form
							className="space-y-3"
							title="signup"
							autoComplete="off"
						>
							{SIGNUPFIELD.map((val) => (
								<InputField
									{...val}
									key={val.name}
									errors={errors}
								/>
							))}
							<button
								disabled={isSubmitting}
								type="submit"
								className="btn btn-primary block w-full "
							>
								<strong>Signup</strong>
							</button>
						</Form>
					)}
				</Formik>

				<div className="text-center">
					<span className="text-sm font-light">
						Already have a Account
					</span>
					<Link to="/login" className="link">
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
}

interface InitialState {
	email: string;
	password: string;
	confirmPassword: string;
}

type handleSubmitType = (
	values: InitialState,
	formikHalper: FormikHelpers<InitialState>
) => void | Promise<any>;
