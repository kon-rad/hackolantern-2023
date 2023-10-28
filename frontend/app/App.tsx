"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

// import { useAppContext } from "@/lib/context/AppProvider/hooks/useAppContext";

const queryClient = new QueryClient();

// This wrapper is used to make effect calls at a high level in app rendering.
export const App = ({ children }: PropsWithChildren): JSX.Element => {
  // const { fetchHello } = useAppContext();

  useEffect(() => {
    // void fetchHello();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-1">{children}</div>
    </QueryClientProvider>
  );
};
