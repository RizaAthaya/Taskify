import { Navigate } from "react-router-dom";
import Register from "@/features/auth/register";
import Login from "@/features/auth/login";

export const publicRoutes = [
  {
    path: "/",
    element: <Navigate to={"/auth/login"} />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
