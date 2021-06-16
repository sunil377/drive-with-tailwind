import { validateType } from "../types/types";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signupValidation: validateType<InitialState> = ({
	email,
	password,
	confirmPassword,
}) => {
	const err: {
		email?: string;
		password?: string;
		confirmPassword?: string;
	} = {};

	switch (true) {
		case email.trim() === "":
			err.email = "Required";
			break;
		case !EMAIL_PATTERN.test(email):
			err.email = "Invalid Email";
			break;

		case password.trim() === "":
			err.password = "Required";
			break;
		case password.trim().length < 6:
			err.password = "Password Should Be 6 Charactor long";
			break;

		case confirmPassword.trim() === "":
			err.confirmPassword = "Required";
			break;
		case confirmPassword.trim().length < 6:
			err.confirmPassword = "Password Should Be 6 Charactor long";
			break;
	}

	return err;
};

interface InitialState {
	email: string;
	password: string;
	confirmPassword: string;
}
