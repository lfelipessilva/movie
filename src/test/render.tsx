import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { type QueryClient } from "@tanstack/react-query";
import { AllProvidersWrapper } from "./utils";
import { createTestQueryClient } from "./helpers";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialEntries?: string[];
  initialIndex?: number;
  queryClient?: QueryClient;
  initialFavorites?: number[];
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialEntries = ["/"],
    initialIndex = 0,
    queryClient = createTestQueryClient(),
    initialFavorites = [],
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AllProvidersWrapper
        initialEntries={initialEntries}
        initialIndex={initialIndex}
        queryClient={queryClient}
        initialFavorites={initialFavorites}
      >
        {children}
      </AllProvidersWrapper>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

