import { QueryClient } from "@tanstack/react-query";
import type { PopularMovie, Movie } from "../types/movie";
import i18n from "../lib/i18n";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en/translation.json";
import ptTranslations from "../locales/pt/translation.json";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

let testI18nInstance: ReturnType<typeof i18n.createInstance> | null = null;

export function createTestI18nInstance() {
  const testI18n = i18n.createInstance();
  testI18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });
  testI18nInstance = testI18n;
  return testI18n;
}

export function getTestI18nInstance() {
  if (!testI18nInstance) {
    return createTestI18nInstance();
  }
  return testI18nInstance;
}

export function resetTestI18nInstance() {
  testI18nInstance = null;
}

export function setupFavorites(initialFavorites: number[] = []) {
  if (initialFavorites.length > 0) {
    localStorage.setItem("movie-favorites", JSON.stringify(initialFavorites));
  } else {
    localStorage.removeItem("movie-favorites");
  }
}

export function createMockPopularMovie(
  overrides?: Partial<PopularMovie>
): PopularMovie {
  return {
    adult: false,
    backdrop_path: "/backdrop.jpg",
    genre_ids: [1, 2, 3],
    id: 1,
    original_language: "en",
    original_title: "Test Movie",
    overview: "Test overview",
    popularity: 100,
    poster_path: "/poster.jpg",
    release_date: "2024-01-01",
    title: "Test Movie",
    video: false,
    vote_average: 8.5,
    vote_count: 100,
    ...overrides,
  };
}

export function createMockMovie(overrides?: Partial<Movie>): Movie {
  return {
    adult: false,
    backdrop_path: "/backdrop.jpg",
    belongs_to_collection: null,
    budget: 1000000,
    genres: [{ id: 1, name: "Action" }],
    homepage: "https://example.com",
    id: 1,
    imdb_id: "tt1234567",
    origin_country: ["US"],
    original_language: "en",
    original_title: "Test Movie",
    overview: "Test overview",
    popularity: 100,
    poster_path: "/poster.jpg",
    production_companies: [],
    production_countries: [],
    release_date: "2024-01-01",
    revenue: 2000000,
    runtime: 120,
    spoken_languages: [],
    status: "Released",
    tagline: "Test tagline",
    title: "Test Movie",
    video: false,
    vote_average: 8.5,
    vote_count: 100,
    ...overrides,
  };
}
