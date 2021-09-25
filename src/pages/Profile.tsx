import { useState } from "react";
import Alert from "../Components/Alert";
import { PRIMARY } from "../constant/color";
import { useAuth } from "../Contexts/useAuthContext";
import Button from "../ui/Button";

export default function Profile() {
  const [state, setState] = useState({
    error: "",
    message: "",
    loading: false,
  });

  const currentUser = useAuth();

  const handleVerifyEmail = async () => {
    setState({
      error: "",
      loading: true,
      message: "",
    });
    if (currentUser) {
      try {
        await currentUser.sendEmailVerification();
        setState((prev) => ({
          ...prev,
          message: "Check your Email inbox for further instructions",
          loading: false,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          error: "something went wrong",
          loading: false,
        }));
      }
    }
  };
  const { error, loading, message } = state;

  return (
    <div className="card mt-24">
      {message && <Alert message={message} variant="success" />}
      {error && <Alert message={error} variant="alert" />}
      <h1 className="text-lg">
        <strong>Profile</strong>
      </h1>

      <h2>
        <strong className="text-blue-500"> Email: </strong>
        <em>{currentUser && currentUser.email}</em>
      </h2>

      {currentUser && currentUser.emailVerified ? (
        <strong>Email verified</strong>
      ) : (
        <Button
          disabled={loading}
          onClick={handleVerifyEmail}
          varient={PRIMARY}
        >
          Verify Email
        </Button>
      )}
    </div>
  );
}
