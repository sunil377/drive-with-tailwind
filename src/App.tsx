import { lazy, Suspense } from "react";
import { AuthProvider } from "./Contexts/useAuthContext";

import Navbar from "./Components/Navbar";
import { ErrorBoundary } from "./Components/ErrorBoundary";

import PublicRoute from "./Guard/PublicRoute";
import PrivateRoute from "./Guard/PrivateRoute";

import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import { useTitle } from "./hooks/useTitle";
import { Route, Switch } from "react-router-dom";
import Test from "./Components/Test";
import { SwitchComponent } from "./ui/Switch";

const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  useTitle();
  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className={"px-4 md:px-0 sm:w-10/12 mx-auto"}>
          <Navbar />
          <Suspense fallback={<div>loading...</div>}>
            <main>
              <Switch>
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PublicRoute
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                <PrivateRoute path="/folders/:id" exact component={Dashboard} />

                <Route path="/test" component={Test} />

                <PrivateRoute path="/" exact component={Dashboard} />
              </Switch>
            </main>
          </Suspense>
          <SwitchComponent />
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}
