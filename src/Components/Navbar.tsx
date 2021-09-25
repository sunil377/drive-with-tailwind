import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";

export default function Navbar() {
  const currentUser = useAuth();
  const history = useHistory();

  const handleClick = () => {
    if (currentUser) {
      Auth.signOut()
        .then(() => history.push("/login"))
        .catch((err) => alert(err.message));
    }
  };

  return (
    <nav className="relative">
      <div className="flex justify-between py-2 px-1 items-center">
        <LinkComponent to="/">
          <strong>Google Drive</strong>
        </LinkComponent>
        <ul className="flex justify-end flex-1 items-center space-x-1">
          {currentUser ? (
            <>
              <LinkComponent to="/profile">Profile</LinkComponent>
              <button
                onClick={() => handleClick()}
                className="inline-block px-2 sm:px-4 py-2 text-lg border border-transparent
               rounded hover:bg-indigo-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <LinkComponent to="/signup">Signup</LinkComponent>

              <LinkComponent to="/login">Login</LinkComponent>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

const LinkComponent: LinkComponentType = ({ children, to = "" }) => {
  return (
    <Link
      to={to}
      className="inline-block px-2 sm:px-4 py-2 text-lg border border-transparent
        rounded hover:bg-indigo-500 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
};

type LinkComponentType = FC<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    to?: string;
  }
>;
