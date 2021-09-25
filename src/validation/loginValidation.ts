import { validateType } from "../types/types";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const loginValidation: validateType<InitialState> = ({
  email,
  password,
}) => {
  const err: {
    email?: string;
    password?: string;
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
      err.password = "Password Should Be Minimum 6 Charactor Long";
      break;
  }

  return err;
};
type InitialState = {
  email: string;
  password: string;
};
