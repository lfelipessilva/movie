import { QueryClient } from "@tanstack/react-query";
import i18n from "./i18n";

export const queryClient = new QueryClient();

i18n.on("languageChanged", () => {
  queryClient.invalidateQueries();
});