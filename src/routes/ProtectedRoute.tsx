import { useUser } from "@/context/user/useUser";
import LoadingPage from "@/features/fallback/loading";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  const isAuthenticated = !!user;

  if (loading) {
    return <LoadingPage />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace={true} />;
};

export default ProtectedRoute;
