import { Dispatch } from "react";
import { SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Auth, userType } from "../lib/firebase";

const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => {
	const user = useContext(AuthContext);
	return user && user.currentUser;
};

export const useSetAuth = () => {
	const user = useContext(AuthContext);
	return user && user.setCurrentUser;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [currentUser, setCurrentUser] = useState<userType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return Auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

// TYPE=======================================

export type AuthContextType = {
	currentUser: null | userType;
	setCurrentUser: Dispatch<SetStateAction<userType | null>>;
} | null;
