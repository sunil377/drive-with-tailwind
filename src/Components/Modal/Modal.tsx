import { useCallback, useEffect, useMemo } from "react";
import { Formik } from "formik";

import { useAuth } from "../../Contexts/useAuthContext";
import { createFolder } from "../../helper/AddFolder/createFolder";

import { onSubmitType, validateType } from "../../types/types";
import { currentPathType } from "../../types/firebaseType";
import { ModalForm } from "./ModalForm";
import { Dialog } from "./Dialog";

export default function Modal({
  currentFolderId,
  currentPath,
  handleClose,
}: Props) {
  const currentUser = useAuth();
  const initialState = useMemo(() => ({ name: "" }), []);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") {
        handleClose();
        e.stopPropagation();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  const validate: validateType<typeof initialState> = ({ name }) => {
    const err: {
      name?: string;
    } = {};

    switch (true) {
      case name.trim() === "":
        err.name = "Required";
        break;

      case name.trim().length < 3:
        err.name = "Name Should Be 3 Character Long";
        break;
    }

    return err;
  };

  const handleSubmit: onSubmitType<typeof initialState> = (
    { name },
    { setSubmitting, setErrors }
  ) => {
    if (currentUser) {
      createFolder({
        currentUser,
        currentPath,
        currentFolderId,
        name: name.toLowerCase(),
      })
        .then(() => {
          setSubmitting(false);
          handleClose();
        })
        .catch(({ message }) => {
          setErrors({
            name: message,
          });
          setSubmitting(false);
        });
    }
  };

  return (
    <Dialog
      classname={`w-full fixed h-screen inset-0 flex items-center 
      justify-center bg-gray-800 dark:bg-white bg-opacity-40 
      dark:bg-opacity-30 z-10 `}
    >
      <div className="card animate-popup">
        <Formik
          initialValues={initialState}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {(props) => <ModalForm {...props} handleClose={handleClose} />}
        </Formik>
      </div>
    </Dialog>
  );
}

interface Props {
  handleClose: () => void;
  currentPath: currentPathType;
  currentFolderId: string | null;
  show: boolean;
}
