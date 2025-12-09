import { useUser } from "@/context/user/useUser";
import LoadingPage from "@/features/fallback/loading";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute: React.FC = () => {
  const { user, loading } = useUser();

  const isAuthenticated = !!user;

  if (loading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
