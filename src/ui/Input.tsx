import {
  DetailedHTMLProps,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ErrorMessage, Field } from "formik";
import ExclamationCircleIcon from "@heroicons/react/solid/ExclamationCircleIcon";

const Input: InputProps = ({
  name = "",
  type = "text",
  errors = {},
  ...rest
}) => {
  const isInvalid = name in errors;

  const [isError, setError] = useState(false);

  return (
    <div className="relative">
      <Field
        type={type}
        name={name}
        className={`py-2 px-4 block w-full dark:text-black rounded-md 
          border border-gray-400 dark:border-transparent dark:bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 
          focus:border-blue-400 ${isError ? " border-red-500 " : ""}`}
        aria-invalid={isInvalid}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(message) => (
          <ErrorComponent setError={setError} name={name} message={message} />
        )}
      />
    </div>
  );
};

export default Input;

const ErrorComponent: ErrorComponentType = ({ setError, name, message }) => {
  useEffect(() => {
    setError(true);
    return () => setError(false);
  }, [setError]);

  return (
    <>
      <ExclamationCircleIcon
        className={`absolute right-3 top-3 h-5 w-5 text-red-500`}
      />
      <span
        role="alert"
        className="text-red-500 text-xs pl-4"
        aria-label={name}
      >
        * {message}
      </span>
    </>
  );
};

type InputProps = FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    errors?: Record<string, string>;
  }
>;

type ErrorComponentType = FC<{
  name: string;
  message: string;
  setError: Dispatch<SetStateAction<boolean>>;
}>;
