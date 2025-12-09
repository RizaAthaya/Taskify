import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { fallbackRoutes } from "./fallback";
import ProtectedRoute from "../ProtectedRoute";
import GuestRoute from "../GuestRoute";

export const router = createBrowserRouter([
  // Private
  {
    element: <ProtectedRoute />,
    children: privateRoutes,
  },

  // Public
  {
    element: <GuestRoute />,
    children: publicRoutes,
  },

  // Fallback
  {
    path: "*",
    children: fallbackRoutes,
  },
]);
