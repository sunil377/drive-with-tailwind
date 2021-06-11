import { FC } from "react";
import { ErrorMessage, Field, FormikErrors } from "formik";

const InputField: Props = ({ placeholder, name, errors, ...props }) => {
	return (
		<>
			<Field
				name={name}
				className="input"
				placeholder={"Enter " + placeholder}
				{...props}
				aria-invalid={name in errors ? true : false}
			/>
			<ErrorMessage
				name={name}
				component="span"
				className="text-red-500 ml-4 text-sm"
			/>
		</>
	);
};

export default InputField;

type Props = FC<{
	type: string;
	name: string;
	placeholder: string;
	errors: FormikErrors<Record<string, string>>;
}>;
