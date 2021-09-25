import { FC } from "react";

const Alert: Props = ({ message, variant }) => {
  let type = variant === "alert" ? "bg-red-400" : "bg-green-400";
  const live = variant === "alert" ? "assertive" : ("polite" as const);
  return (
    <div
      role="alert"
      className={`${type} text-white text-sm py-2 capitalize text-center rounded-md`}
      aria-live={live}
    >
      {message}
    </div>
  );
};

export default Alert;

type Props = FC<{
  message: string;
  variant: "alert" | "success";
}>;
