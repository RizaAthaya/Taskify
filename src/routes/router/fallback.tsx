import Task from "@/features/task";

export const fallbackRoutes = [
  {
    path: "*",
    element: <Task />,
  },
];
