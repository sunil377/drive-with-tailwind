import { useHistory } from "react-router-dom";
import { FC, useMemo, useRef } from "react";
import { Formik, Form, FormikErrors } from "formik";

import { useSetAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import { loginValidation } from "../validation/loginValidation";
import { onSubmitType } from "../types/types";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Container from "../ui/Container";
import Anchor from "../ui/Anchor";
import Center from "../ui/Center";
import { useEffect } from "react";

export default function Login() {
	const setCurrentUser = useSetAuth();
	const history = useHistory();

	const initialState = useMemo(
		() => ({
			email: "",
			password: "",
		}),
		[]
	);

	const handleSubmit: onSubmitType<typeof initialState> = async (
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
					{(props) => {
						return <LoginForm {...props} />;
					}}
				</Formik>
				<hr />
				<Center className=" space-y-2">
					<Anchor to="/signup" title="Create New Account" />
				</Center>
			</Card>
		</Container>
	);
}

type InitialState = {
	email: string;
	password: string;
};

const LoginForm: FC<{
	errors: FormikErrors<InitialState>;
	isSubmitting: boolean;
}> = ({ errors, isSubmitting }) => {
	const loginRef = useRef<HTMLFormElement>(null);
	const isSubmit = useRef(false);

	const isSubmitRefCurrent = isSubmit.current;

	useEffect(() => {
		if (isSubmitRefCurrent) {
			const keys = Object.keys(errors);
			const tabList = loginRef.current?.querySelectorAll("input");
			if (keys.length > 0 && tabList) {
				tabList.forEach((ele) => {
					if (ele.name === keys[0]) {
						ele.focus();
					}
				});
				isSubmit.current = false;
			}
		}
	}, [isSubmitRefCurrent, errors]);

	useEffect(() => {
		if (isSubmitting) {
			isSubmit.current = true;
		}
	}, [isSubmitting]);

	return (
		<Form
			className="space-y-2"
			title="login"
			autoComplete="off"
			noValidate
			ref={loginRef}
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
	);
};
