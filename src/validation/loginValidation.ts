import { FormikErrors } from "formik";

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,4}$/i;

export const loginValidation: validateType = ({ email, password }) => {
	const err: {
		email?: string;
		password?: string;
	} = {};

	if (email.trim() === "") {
		err.email = "Required";
	} else if (!email.match(EMAIL_PATTERN)) {
		err.email = "Invalid Email";
	}
	if (password.trim() === "") {
		err.password = "Required";
	} else if (password.trim().length < 6) {
		err.password = "Password Should Be Minimum 6 Charactor Long";
	}
	return err;
};
type InitialState = {
	email: string;
	password: string;
};

type validateType = (
	values: InitialState
) => void | object | Promise<FormikErrors<InitialState>>;
