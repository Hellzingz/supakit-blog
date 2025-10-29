import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/LoadingSpinner";

function PublicRoute({ children }) {
  const { state } = useAuth();
  const isLoading = state.getUserLoading;
  const isAuthenticated = Boolean(state.user);

  if (isLoading === null || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <LoadingSpinner message="Please wait ..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
