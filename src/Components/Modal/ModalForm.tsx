import { FormikErrors, Form } from "formik";
import { FC, useRef, useEffect } from "react";
import { DANGER, PRIMARY } from "../../constant/color";
import { Input } from "../../ui";
import Button from "../../ui/Button";

export const ModalForm: FC<{
  errors: FormikErrors<{ name: string }>;
  isSubmitting: boolean;
  handleClose: () => void;
}> = ({ errors, isSubmitting, handleClose }) => {
  const modalRef = useRef<HTMLFormElement>(null);
  const isSubmitRef = useRef(false);
  const isSubmitRefCurrent = isSubmitRef.current;

  useEffect(() => {
    if (isSubmitRefCurrent) {
      if (errors["name"]) {
        modalRef.current?.querySelector("input")?.focus();
        isSubmitRef.current = false;
      }
    }
  }, [isSubmitRefCurrent, errors]);

  useEffect(() => {
    if (isSubmitting) {
      isSubmitRef.current = true;
    }
  }, [isSubmitting]);

  return (
    <Form
      title="Add Folder"
      className="space-y-3 sm:space-y-4"
      autoComplete="off"
      noValidate
      ref={modalRef}
    >
      <Input
        name="name"
        placeholder="Enter Name"
        type="text"
        required={true}
        errors={errors}
        autoFocus={true}
      />
      <div className="flex space-x-2 sm:space-x-4 justify-end ">
        <Button type="submit" disabled={isSubmitting} varient={PRIMARY}>
          Submit
        </Button>
        <Button onClick={handleClose} varient={DANGER}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};
