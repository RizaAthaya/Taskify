import NotFoundPage from "@/features/fallback/not-found";

export const fallbackRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
