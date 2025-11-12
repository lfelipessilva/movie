import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import i18n from "./lib/i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { FavoritesProvider } from "./contexts/favorites/context.tsx";
import { Router } from "./router.tsx";

const updateHtmlLang = () => {
  const lang = i18n.language || "en";
  document.documentElement.lang = lang;
};

updateHtmlLang();

i18n.on("languageChanged", updateHtmlLang);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Router />
      </FavoritesProvider>
    </QueryClientProvider>
  </StrictMode>
);
