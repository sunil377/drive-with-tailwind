import { useHistory } from "react-router-dom";

import { useSetAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import { Formik, Form, FormikHelpers } from "formik";
import { loginValidation } from "../validation/loginValidation";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Container from "../ui/Container";
import Anchor from "../ui/Anchor";
import Center from "../ui/Center";

const initialState = {
	email: "",
	password: "",
};

export default function Login() {
	const setCurrentUser = useSetAuth();
	const history = useHistory();

	const handleSubmit: onSubmitType = async (
		{ email, password },
		{ setSubmitting, setErrors }
	) => {
		try {
			const { user } = await Auth.signInWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser && setCurrentUser(user);
			history.push("/");
		} catch ({ code, message }) {
			if (code === "auth/wrong-password") {
				setErrors({ password: "Wrong Password" });
			} else {
				setErrors({ email: "No User Founds" });
			}
			setSubmitting(false);
		}
	};

	return (
		<Container className="mt-24">
			<Card className="space-y-2">
				<Formik
					initialValues={initialState}
					validate={loginValidation}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, errors }) => (
						<Form
							className="space-y-2"
							title="login"
							autoComplete="off"
						>
							<Input
								type="email"
								name="email"
								as="field"
								placeholder="Enter Email"
								errors={errors}
								required={true}
								autoFocus={true}
							/>
							<Input
								type="password"
								name="password"
								as="field"
								placeholder="Enter Password"
								errors={errors}
								required={true}
							/>
							<Button
								title="Log In"
								disabled={isSubmitting}
								type="submit"
								className=" block w-full"
							/>
							<Center>
								<Anchor
									to="/forgotpassword"
									title="Forgotten Password ?"
									className="text-xs align-middle"
								/>
							</Center>
						</Form>
					)}
				</Formik>
				<hr />
				<Center className=" space-y-2">
					<Anchor to="/signup" title="Create New Account" />
				</Center>
			</Card>
		</Container>
	);
}

type onSubmitType = (
	values: typeof initialState,
	formikHelpers: FormikHelpers<typeof initialState>
) => void | Promise<any>;
