import { FC } from "react";
import { Link } from "react-router-dom";

const Anchor: Props = ({ to, title, className = "" }) => {
  return <Link to={to} className={`${className}  `} children={title} />;
};

export default Anchor;

type Props = FC<{
  title: string;
  to: string;
  className?: string;
}>;
