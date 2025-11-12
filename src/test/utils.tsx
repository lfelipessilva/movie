import React from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { I18nextProvider } from "react-i18next";
import { FavoritesProvider } from "../contexts/favorites";
import { createTestQueryClient, getTestI18nInstance } from "./helpers";

interface RouterWrapperProps {
  children: React.ReactNode;
  initialEntries?: string[];
  initialIndex?: number;
}

export function RouterWrapper({
  children,
  initialEntries = ["/"],
  initialIndex = 0,
}: RouterWrapperProps) {
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: <>{children}</>,
      },
    ],
    {
      initialEntries,
      initialIndex,
    }
  );

  return <RouterProvider router={router} />;
}

interface QueryWrapperProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export function QueryWrapper({
  children,
  queryClient = createTestQueryClient(),
}: QueryWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

interface FavoritesWrapperProps {
  children: React.ReactNode;
  initialFavorites?: number[];
}

export function FavoritesWrapper({
  children,
  initialFavorites = [],
}: FavoritesWrapperProps) {
  React.useEffect(() => {
    if (initialFavorites.length > 0) {
      localStorage.setItem("movie-favorites", JSON.stringify(initialFavorites));
    } else {
      localStorage.removeItem("movie-favorites");
    }
  }, [initialFavorites]);

  return <FavoritesProvider>{children}</FavoritesProvider>;
}

interface AllProvidersWrapperProps {
  children: React.ReactNode;
  initialEntries?: string[];
  initialIndex?: number;
  queryClient?: QueryClient;
  initialFavorites?: number[];
}

export function AllProvidersWrapper({
  children,
  initialEntries = ["/"],
  initialIndex = 0,
  queryClient = createTestQueryClient(),
  initialFavorites = [],
}: AllProvidersWrapperProps) {
  const i18nInstance = getTestI18nInstance();
  return (
    <I18nextProvider i18n={i18nInstance}>
      <QueryWrapper queryClient={queryClient}>
        <FavoritesWrapper initialFavorites={initialFavorites}>
          <RouterWrapper
            initialEntries={initialEntries}
            initialIndex={initialIndex}
          >
            {children}
          </RouterWrapper>
        </FavoritesWrapper>
      </QueryWrapper>
    </I18nextProvider>
  );
}
