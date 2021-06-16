import { FC } from "react";
import { ErrorMessage, Field } from "formik";

const Input: Props = ({
	name,
	type = "text",
	placeholder = "",
	as,
	errors = {},
	required = false,
	autoFocus = false,
}) => {
	const className =
		"py-2 px-4 block w-full border border-gray-400 dark:border-transparent dark:bg-white dark:text-black rounded-md outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 focus:border-blue-400 text-sm";

	const isInvalid = name in errors;

	const FIELDS = {
		name,
		type,
		className,
		placeholder,
		required,
		autoFocus,
		"aria-invalid": isInvalid,
	};

	if (as) {
		return (
			<>
				<Field {...FIELDS} />
				<ErrorMessage
					name={name}
					render={(message) => (
						<span
							className="text-xs text-red-500 pl-4 capitalize"
							role="alert"
							aria-label={name}
						>
							<span aria-hidden="true">*</span>
							{message}
						</span>
					)}
				/>
			</>
		);
	}
	return <input {...FIELDS} />;
};

export default Input;

type Props = FC<{
	name: string;
	type?: "text" | "email" | "password";
	placeholder?: string;
	errors?: Record<string, string>;
	as?: "field";
	required?: boolean;
	autoFocus?: boolean;
}>;
