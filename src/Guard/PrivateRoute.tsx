import { FC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";

export default function PrivateRoute({ component: Component, ...rest }: Props) {
	const currentUser = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to="/signup" />
				);
			}}
		/>
	);
}

interface Props {
	component: FC<RouteComponentProps>;
	path: string;
	exact?: boolean;
}
