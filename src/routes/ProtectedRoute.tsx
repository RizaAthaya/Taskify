import { useUser } from "@/context/user/useUser";
import LoadingPage from "@/features/fallback/loading";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  const isAuthenticated = !!user;
  const isProfileReady =
    user?.displayName !== null && user?.displayName !== undefined && user?.displayName !== "";

  if (loading) {
    return <LoadingPage />;
  }

  if (isAuthenticated && !isProfileReady) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
