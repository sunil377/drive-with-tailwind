import { lazy, Suspense } from "react";
import { Switch } from "react-router";

import { AuthProvider } from "./Contexts/useAuthContext";

import Navbar from "./Components/Navbar";
import { ErrorBoundary } from "./Components/ErrorBoundary";

import PublicRoute from "./Guard/PublicRoute";
import PrivateRoute from "./Guard/PrivateRoute";

import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";

const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
	console.log(Dashboard);
	return (
		<AuthProvider>
			<ErrorBoundary>
				<Navbar />
				<Suspense fallback={<div>loading...</div>}>
					<Switch>
						<PublicRoute path="/login" component={Login} />
						<PublicRoute path="/signup" component={Signup} />
						<PrivateRoute
							path="/profile"
							exact
							component={Profile}
						/>
						<PublicRoute
							path="/forgotpassword"
							component={ForgotPassword}
						/>
						<PrivateRoute
							path="/folders/:id"
							exact
							component={Dashboard}
						/>
						<PrivateRoute path="/" exact component={Dashboard} />
					</Switch>
				</Suspense>
			</ErrorBoundary>
		</AuthProvider>
	);
}
