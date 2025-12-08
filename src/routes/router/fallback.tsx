import Dashboard from "@/features/dashboard";

export const fallbackRoutes = [
  {
    path: "*",
    element: <Dashboard />,
  },
];
