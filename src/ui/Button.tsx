import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const BTN = `px-4 py-2 rounded-sm border border-transparent 
w-full block capitalize dark:hover:border-transparent
disabled:cursor-not-allowed disabled:opacity-50 
transition duration-200 ease-linear  text-white 
hover:bg-white dark:hover:bg-white disabled:text-white focus:bg-white
focus:outline-none`;

const Button: ButtonProps = ({ children, className, varient, ...rest }) => {
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
