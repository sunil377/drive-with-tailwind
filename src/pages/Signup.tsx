import { useHistory } from "react-router-dom";
import { Form, Formik, FormikErrors } from "formik";
import { FC, Fragment, useEffect, useMemo, useRef } from "react";

import { useSetAuth } from "../Contexts/useAuthContext";
import { signupValidation } from "../validation/signupValidation";
import { Auth } from "../lib/firebase";

import { onSubmitType } from "../types/types";
import { Anchor, Input, Button } from "../ui";

import { PRIMARY } from "../constant/color";

export default function Signup() {
  const history = useHistory();
  const setCurrentUser = useSetAuth();

  const initialState = useMemo(
    () => ({
      email: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const handleSubmit: onSubmitType<typeof initialState> = (
    { email, password, confirmPassword },
    { setSubmitting, setErrors }
  ) => {
    if (password !== confirmPassword) {
      setErrors({
        password: "Password Don't Match",
        confirmPassword: "Password Don't Match",
      });
      setSubmitting(false);
      return;
    }

    Auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setCurrentUser && setCurrentUser(user);
        history.push("/");
      })
      .catch(({ message, code }) => {
        setErrors({
          email:
            code === "auth/email-already-in-use"
              ? "User Already Exists"
              : message,
        });
        setSubmitting(false);
      });
  };

  return (
    <div className="card mt-24">
      <Formik
        initialValues={initialState}
        validate={signupValidation}
        onSubmit={handleSubmit}
      >
        {({ ...props }) => (
          <Fragment>
            <SignupForm {...props} />
            <div className="text-center">
              <span>Already have a Account</span>
              <Anchor.BASE to="/login" className="inline-block text-lg">
                Log In
              </Anchor.BASE>
            </div>
          </Fragment>
        )}
      </Formik>
    </div>
  );
}

const SignupForm: FC<{
  errors: FormikErrors<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  isSubmitting: boolean;
}> = ({ errors, isSubmitting }) => {
  const isSubmit = useRef(false);
  const signupRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSubmit.current || !signupRef.current) return;

    const keys = Object.keys(errors);
    const tabList = signupRef.current.querySelectorAll("input");

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
      className="space-y-4 "
      title="signup"
      autoComplete="off"
      ref={signupRef}
      noValidate
    >
      <Input
        type="email"
        name="email"
        placeholder="Enter Email"
        errors={errors}
        required={true}
      />
      <Input
        type="password"
        name="password"
        placeholder="Enter Password"
        errors={errors}
        required={true}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Enter ConFirm Password"
        errors={errors}
        required={true}
      />
      <Button disabled={isSubmitting} type="submit" varient={PRIMARY}>
        sign up
      </Button>
    </Form>
  );
};
