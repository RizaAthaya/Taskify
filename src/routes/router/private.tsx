import MainLayout from "@/components/layout";
import Task from "@/features/task";
import { Navigate } from "react-router-dom";

export const privateRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/tasks"} />,
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
