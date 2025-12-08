import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";

export const router = createBrowserRouter([
  // Private
  // {
  //   // element: <ProtectedRoute />,
  //   children: privateRoutes,
  // },

  // Public
  {
    // element: <GuestRoute />,
    children: publicRoutes,
  },

  // Fallback
  // {
  //   path: "*",
  //   children: fallbackRoutes,
  // },
]);
