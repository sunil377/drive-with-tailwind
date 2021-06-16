import { useEffect } from "react";
import { useLocation } from "react-router";

export const useTitle = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		switch (pathname) {
			case "/profile":
				document.title = "Profile - Google Drive";
				break;
			case "/signup":
				document.title = "Sign Up - Google Drive";
				break;
			case "/login":
				document.title = "Log In - Google Drive";
				break;
			case "/":
				document.title = "Home - Google Drive";
				break;
			default:
				document.title = "Google Drive ";
		}
	}, [pathname]);
};
