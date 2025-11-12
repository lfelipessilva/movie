import React, { useState, useEffect } from "react";
import { FavoritesContext } from "./context";

const FAVORITES_KEY = "movie-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movieId: number) => {
    setFavorites((prev) => {
      if (prev.includes(movieId)) return prev;
      return [...prev, movieId];
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  const toggleFavorite = (movieId: number) => {
    if (favorites.includes(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}


