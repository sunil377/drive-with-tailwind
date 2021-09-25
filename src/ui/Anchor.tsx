import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { Link } from "react-router-dom";
import { BTN } from "../constant/button";
import { PRIMARY } from "../constant/color";

const Anchor: Props = ({
  className = "",
  to = "#",
  varient = PRIMARY,
  children,
  ref,
  ...rest
}) => {
  return (
    <Link
      to={to}
      {...rest}
      className={`${BTN} hover:border-${varient}  
    hover:text-${varient} bg-${varient} disabled:bg-${varient} 
    focus:text-${varient} focus:border-${varient} ${className}`}
    >
      {children}
    </Link>
  );
};
const BASE: Props = ({ className = "", to = "#", children, ref, ...rest }) => {
  return (
    <Link
      to={to}
      {...rest}
      className={`px-4 py-2 block capitalize text-center 
      focus:outline-none focus:underline text-${PRIMARY} ${className}`}
    >
      {children}
    </Link>
  );
};

export default Object.assign(Anchor, { BASE });

/*  types */

type Props = FC<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    to?: string;
    varient?: string;
  }
>;
