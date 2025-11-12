import { useState, useEffect } from "react";

const FAVORITES_KEY = "movie-favorites";

export function useFavorites() {
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

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}

