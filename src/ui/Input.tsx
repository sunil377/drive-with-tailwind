import { FC, KeyboardEventHandler } from "react";
import { ErrorMessage, Field } from "formik";
import { forwardRef } from "react";
import { Ref } from "react";

const Input: Props = forwardRef(function (
	{
		name,
		type = "text",
		placeholder = "",
		as,
		errors = {},
		required = false,
		autoFocus = false,
		tabIndex = 0,
		id,
		active = "false",
		onKeyPress,
	},
	ref
) {
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
		tabIndex,
		id,
		onKeyPress,
		"data-active": active,
		"aria-invalid": isInvalid,
	};

	if (as) {
		return (
			<>
				<Field {...FIELDS} innerRef={ref} />
				<ErrorMessage
					name={name}
					render={(message) => (
						<span
							className="text-xs text-red-500 pl-4 capitalize"
							role="alert"
						>
							*{message}
						</span>
					)}
				/>
			</>
		);
	}
	return <input {...FIELDS} ref={ref} />;
});

export default Input;

type Props = FC<{
	name: string;
	type?: "text" | "email" | "password";
	placeholder?: string;
	errors?: Record<string, string>;
	as?: "field";
	required?: boolean;
	autoFocus?: boolean;
	tabIndex?: 0 | -1 | 1;
	active?: string;
	ref?: Ref<HTMLInputElement>;
	id?: string;
	onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
}>;
