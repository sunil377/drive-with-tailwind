import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { BTN } from "../constant/button";

const Button: ButtonProps = ({
  className = "",
  children,
  varient,
  ...rest
}) => {
  return (
    <button
      className={`${BTN} hover:border-${varient}  
        hover:text-${varient} bg-${varient} disabled:bg-${varient} 
        focus:text-${varient} focus:border-${varient} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

/* Props */

type ButtonProps = FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    varient?: string;
  }
>;
