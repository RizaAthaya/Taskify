import Dashboard from "@/features/dashboard";

export const privateRoutes = [
  {
    path: "/",
    // element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
