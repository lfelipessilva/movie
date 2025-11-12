import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { FavoritesProvider } from "./contexts/favorites/context.tsx";
import { Router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Router />
      </FavoritesProvider>
    </QueryClientProvider>
  </StrictMode>
);
