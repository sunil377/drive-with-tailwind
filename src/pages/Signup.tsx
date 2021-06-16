import { useHistory } from "react-router-dom";
import { Form, Formik, FormikErrors } from "formik";
import { FC, useMemo } from "react";

import { useSetAuth } from "../Contexts/useAuthContext";
import { signupValidation } from "../validation/signupValidation";
import { Auth } from "../lib/firebase";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import Container from "../ui/Container";
import Anchor from "../ui/Anchor";
import Center from "../ui/Center";
import { onSubmitType } from "../types/types";
import { useRef } from "react";
import { useEffect } from "react";

export default function Signup() {
	const history = useHistory();
	const setCurrentUser = useSetAuth();

	const initialState = useMemo(
		() => ({
			email: "",
			password: "",
			confirmPassword: "",
		}),
		[]
	);

	const handleSubmit: onSubmitType<typeof initialState> = (
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
					{({ ...props }) => <SignupForm {...props} />}
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

const SignupForm: FC<{
	errors: FormikErrors<{
		email: string;
		password: string;
		confirmPassword: string;
	}>;
	isSubmitting: boolean;
}> = ({ errors, isSubmitting }) => {
	const isSubmit = useRef(false);
	const signupRef = useRef<HTMLFormElement>(null);

	const signupCurrent = signupRef.current;
	const isSubmitCurrent = isSubmit.current;

	const tabList = useMemo(() => {
		return signupCurrent && signupCurrent.querySelectorAll("input");
	}, [signupCurrent]);

	useEffect(() => {
		if (isSubmitCurrent && tabList) {
			const keys = Object.keys(errors);
			if (keys.length > 0) {
				tabList.forEach((ele) => {
					if (ele.name === keys[0]) {
						ele.focus();
					}
				});
				isSubmit.current = false;
			}
		}
	}, [isSubmitCurrent, tabList, errors]);

	useEffect(() => {
		if (isSubmitting) {
			isSubmit.current = true;
		}
	}, [isSubmitting]);
	return (
		<Form
			className="space-y-2 sm:space-y-3 md:space-y-4"
			title="signup"
			autoComplete="off"
			ref={signupRef}
			noValidate
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
	);
};
