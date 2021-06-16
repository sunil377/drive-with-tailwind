import { validateType } from "../types/types";

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

	if (email.trim() === "") {
		err.email = "Required";
	} else if (email.match(/[\s]/)) {
		err.email = "Invalid Email, Space Are Not Allowed";
	} else if (email.match(/[<>]/)) {
		err.email = "Invalid Email, Special Chracters Are Not Allowed";
	} else if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,4}$/i)) {
		err.email = "Invalid Email";
	}

	if (password.trim() === "") {
		err.password = "Required";
	} else if (password.trim().length < 6) {
		err.password = "Password Should Be 6 Charactor long";
	} else if (!password.match(/^\w{6,}$/)) {
		err.password = "Invalid Password, Space Are Not Allowed";
	}
	if (confirmPassword.trim() === "") {
		err.confirmPassword = "Required";
	} else if (confirmPassword.trim().length < 6) {
		err.confirmPassword = "Password Should Be 6 Charactor long";
	} else if (!password.match(/^\w{6,}$/)) {
		err.confirmPassword = "Invalid Password, Space Are Not Allowed";
	}
	return err;
};

interface InitialState {
	email: string;
	password: string;
	confirmPassword: string;
}
