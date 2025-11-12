import { createContext } from "react";

export interface FavoritesContextType {
  favorites: number[];
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

