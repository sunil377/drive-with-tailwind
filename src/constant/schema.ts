import { object, string } from "yup";

export const LOGINSCHEMA = object().shape({
	email: string().email("*Invalid Email").required("*Required"),
	password: string().min(6, "*Too Short!").required("*Required"),
});
export const SIGNUPSCHEMA = object().shape({
	email: string().email("*Invalid Email").required("*Required"),
	password: string().min(6, "Too Short!").required("*Required"),
	confirmPassword: string().min(6, "Too Short!").required("*Required"),
});

export const NAMESCHEMA = object().shape({
	name: string().min(3, "Too Short!").required("*Required"),
});
