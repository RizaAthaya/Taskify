import MainLayout from "@/components/layout";
import Task from "@/features/task";

export const privateRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
