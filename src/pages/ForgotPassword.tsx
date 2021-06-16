import { useState, useMemo, FC, useRef } from "react";
import { Form, Formik, FormikErrors } from "formik";

import { Auth } from "../lib/firebase";

import Button from "../ui/Button";
import Container from "../ui/Container";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Alert from "../Components/Alert";
import { onSubmitType, validateType } from "../types/types";
import { useEffect } from "react";
import { EMAIL_PATTERN } from "../constant/pattern";

const ForgotPassword = () => {
	const [msg, setMsg] = useState("");

	const initialState = useMemo(() => ({ email: "" }), []);

	const validate: validateType<typeof initialState> = ({ email }) => {
		const err: { email?: string } = {};
		switch (true) {
			case email.trim() === "":
				err.email = "Required";
				break;
			case !EMAIL_PATTERN.test(email):
				err.email = "Invalid Email";
				break;
		}

		return err;
	};

	const handleSubmit: onSubmitType<typeof initialState> = (
		{ email },
		{ setErrors, setSubmitting }
	) => {
		setMsg("");
		Auth.sendPasswordResetEmail(email)
			.then(() => {
				setMsg("Check Your Email INBOX For Further Instruction");
				setSubmitting(false);
			})
			.catch(({ code, message }) => {
				let val = message;
				if (code === "auth/user-not-found") {
					val = "User Don't Exists";
				}
				setErrors({ email: val });
				setSubmitting(false);
			});
	};

	return (
		<Container className="mt-24">
			<Formik
				initialValues={initialState}
				onSubmit={handleSubmit}
				validate={validate}
			>
				{(props) => <ForgotPasswordForm {...props} msg={msg} />}
			</Formik>
		</Container>
	);
};

export default ForgotPassword;

const ForgotPasswordForm: FC<{
	errors: FormikErrors<{ email: string }>;
	isSubmitting: boolean;
	msg: string;
}> = ({ errors, isSubmitting, msg }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const isSubmitRef = useRef(false);
	const isSubmitRefCurrent = isSubmitRef.current;

	useEffect(() => {
		if (isSubmitRefCurrent) {
			if (errors["email"]) {
				formRef.current?.querySelector("input")?.focus();
				isSubmitRef.current = false;
			}
		}
	}, [isSubmitRefCurrent, errors]);

	useEffect(() => {
		if (isSubmitting) {
			isSubmitRef.current = true;
		}
	}, [isSubmitting]);
	return (
		<Form
			title="Reset Password"
			autoComplete="off"
			noValidate
			ref={formRef}
		>
			<Card className="space-y-2">
				{msg && <Alert message={msg} variant="success" />}
				<Input
					type="email"
					placeholder="Enter Email"
					autoFocus={true}
					name="email"
					as="field"
					required
					errors={errors}
				/>
				<Button
					title="Reset Password"
					disabled={isSubmitting}
					type="submit"
					className="block w-full"
				/>
			</Card>
		</Form>
	);
};
