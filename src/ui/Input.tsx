import { FC } from "react";
import { ErrorMessage, Field } from "formik";
import ExclamationCircleIcon from "@heroicons/react/solid/ExclamationCircleIcon";

const Input: Props = ({
  name,
  type = "text",
  placeholder = "",
  as,
  errors = {},
  required = false,
  autoFocus = false,
}) => {
  const isInvalid = name in errors;

  const FIELDS = {
    name,
    type,
    placeholder,
    required,
    autoFocus,
    "aria-invalid": isInvalid,
  };

  if (as) {
    return (
      <div className="relative">
        <Field
          {...FIELDS}
          className={`py-2 px-4 block w-full dark:text-black rounded-md
          border border-gray-400 dark:border-transparent 
          dark:bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 
          focus:border-blue-400 ${isInvalid ? " border-red-500 " : ""}`}
        />
        <ExclamationCircleIcon
          className={`${
            isInvalid ? "inline" : "hidden"
          } absolute right-3 top-3 h-5 w-5 text-red-500`}
        />

        <ErrorMessage
          name={name}
          render={(message) => (
            <span className="sr-only" role="alert" aria-label={name}>
              <span aria-hidden="true">*</span>
              {message}
            </span>
          )}
        />
      </div>
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
