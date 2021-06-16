import { useHistory } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";

import { useSetAuth } from "../Contexts/useAuthContext";
import { signupValidation } from "../validation/signupValidation";
import { Auth } from "../lib/firebase";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import Container from "../ui/Container";
import Anchor from "../ui/Anchor";
import Center from "../ui/Center";

const initialState = {
	email: "",
	password: "",
	confirmPassword: "",
};

export default function Signup() {
	const history = useHistory();
	const setCurrentUser = useSetAuth();

	const handleSubmit: handleSubmitType = (
		{ email, password, confirmPassword },
		{ setSubmitting, setErrors }
	) => {
		if (password !== confirmPassword) {
			setErrors({
				password: "Password Don't Match",
				confirmPassword: "Password Don't Match",
			});
			setSubmitting(false);
			return;
		}

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
				setErrors({
					email: val,
				});
				setSubmitting(false);
			});
	};

	return (
		<Container className="mt-24">
			<Card className="space-y-2">
				<Formik
					initialValues={initialState}
					validate={signupValidation}
					onSubmit={handleSubmit}
				>
					{({ errors, isSubmitting }) => (
						<Form
							className="space-y-2 sm:space-y-3 md:space-y-4"
							title="signup"
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
							<Input
								type="password"
								name="confirmPassword"
								as="field"
								placeholder="Enter ConFirm Password"
								errors={errors}
								required={true}
							/>
							<Button
								title="Sign Up"
								disabled={isSubmitting}
								type="submit"
								className=" block w-full "
							/>
						</Form>
					)}
				</Formik>
				<Center className="space-x-2">
					<span className="text-xs font-light">
						Already have a Account
					</span>
					<Anchor title="Log In" to="/login" />
				</Center>
			</Card>
		</Container>
	);
}

type InitialState = typeof initialState;

type handleSubmitType = (
	values: InitialState,
	formikHalper: FormikHelpers<InitialState>
) => void | Promise<any>;
