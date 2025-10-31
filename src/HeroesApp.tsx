import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
