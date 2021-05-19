import { FC } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";

export default function PublicRoute({ component: Component, ...rest }: Props) {
	const currentUser = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				);
			}}
		/>
	);
}

interface Props {
	component: FC<RouteComponentProps>;
	path: string;
}
