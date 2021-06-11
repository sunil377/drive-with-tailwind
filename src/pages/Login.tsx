import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";

import { useSetAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";

import AlertComponent from "../Components/AlertComponent";
import InputField from "../Components/InputField";

import { LOGINSCHEMA } from "../constant/schema";
import { LOGINFIELD } from "../constant/fields";

export default function Login() {
	const [error, setError] = useState("");
	const setCurrentUser = useSetAuth();

	const history = useHistory();

	useEffect(() => {
		document.title = "Log In - Google Drive";
	}, []);

	const handleSubmit: handleSubmitType = async (
		{ email, password },
		{ setSubmitting }
	) => {
		try {
			const { user } = await Auth.signInWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser && setCurrentUser(user);
			history.push("/");
		} catch ({ code, message }) {
			let errMessage = "No User Founds";
			if (code === "auth/wrong-password") {
				errMessage = "Wrong Password";
			}
			setError(errMessage);
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
					}}
					validationSchema={LOGINSCHEMA}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, errors }) => (
						<Form
							className="space-y-2"
							title="login"
							autoComplete="off"
						>
							{LOGINFIELD.map((val) => (
								<InputField
									{...val}
									key={val.name}
									errors={errors}
								/>
							))}
							<button
								type="submit"
								className="btn btn-primary w-full"
								disabled={isSubmitting}
							>
								<strong>Log In</strong>
							</button>
						</Form>
					)}
				</Formik>
				<div className="text-center space-y-2">
					<Link to="/forgotpassword" className="link text-sm">
						Forgotten Password ?
					</Link>
					<hr />
					<Link to="/signup" className="btn btn-success">
						Create New Account
					</Link>
				</div>
			</div>
		</div>
	);
}

interface InitialState {
	email: string;
	password: string;
}

type handleSubmitType = (
	values: InitialState,
	formikHelpers: FormikHelpers<InitialState>
) => void | Promise<any>;
