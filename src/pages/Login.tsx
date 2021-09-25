import { Link, useHistory } from "react-router-dom";
import { FC, useMemo, useRef } from "react";
import { Formik, Form, FormikErrors } from "formik";

import { useSetAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import { loginValidation } from "../validation/loginValidation";
import { onSubmitType } from "../types/types";

import { useEffect } from "react";
import { Input } from "../ui";
import Button from "../ui/Button";
import { PRIMARY } from "../constant/color";

export default function Login() {
  const setCurrentUser = useSetAuth();
  const history = useHistory();

  const initialState = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const handleSubmit: onSubmitType<typeof initialState> = async (
    { email, password },
    { setSubmitting, setErrors }
  ) => {
    try {
      const { user } = await Auth.signInWithEmailAndPassword(email, password);
      setCurrentUser && setCurrentUser(user);
      history.push("/");
    } catch ({ code, message }) {
      code === "auth/wrong-password"
        ? setErrors({ password: "Wrong Password" })
        : setErrors({ email: "No User Founds" });

      setSubmitting(false);
    }
  };

  return (
    <div className="card mt-24">
      <Formik
        initialValues={initialState}
        validate={loginValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return <LoginForm {...props} />;
        }}
      </Formik>
      <hr />
      <Link to="/signup" className="btn btn-success w-max mx-auto text-xl px-6">
        Create New Account
      </Link>
    </div>
  );
}

type InitialState = {
  email: string;
  password: string;
};

const LoginForm: FC<{
  errors: FormikErrors<InitialState>;
  isSubmitting: boolean;
}> = ({ errors, isSubmitting }) => {
  const loginRef = useRef<HTMLFormElement>(null);
  const isSubmit = useRef(false);

  useEffect(() => {
    if (!isSubmit.current || !loginRef.current) return;

    const keys = Object.keys(errors);
    const tabList = loginRef.current.querySelectorAll("input");

    if (keys.length === 0 || !tabList) return;

    Array.from(tabList).find((ele) => ele.name === keys[0] && ele.focus());

    isSubmit.current = false;
  }, [errors]);

  useEffect(() => {
    if (isSubmitting) {
      isSubmit.current = true;
    }
  }, [isSubmitting]);

  return (
    <Form
      className="space-y-4"
      title="login"
      autoComplete="off"
      noValidate
      ref={loginRef}
    >
      <Input
        type="email"
        name="email"
        as="field"
        placeholder="Enter Email"
        errors={errors}
        required={true}
      />
      <Input
        type="password"
        name="password"
        as="field"
        placeholder="Enter Password"
        errors={errors}
        required={true}
      />
      <Button disabled={isSubmitting} varient={PRIMARY}>
        Log In
      </Button>
      <div className="text-center">
        <Link to="/forgotpassword" className="link text-sm">
          Forgotten Password ?
        </Link>
      </div>
    </Form>
  );
};
