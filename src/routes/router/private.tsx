import MainLayout from "@/components/layout";
import Dashboard from "@/features/dashboard";
import Task from "@/features/task";

export const privateRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tasks",
        children: [
          {
            path: "",
            element: <Task />,
          },
        ],
      },
    ],
  },
];
