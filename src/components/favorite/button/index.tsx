import { Heart } from "lucide-react";
import { useFavorites } from "../../../hooks/ui/use-favorites";

interface FavoriteButtonProps {
  movieId: number;
  variant?: "compact" | "full";
}

export function FavoriteButton({
  movieId,
  variant = "full",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movieId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movieId);
  };

  const favoritedClasses =
    "bg-accent-primary hover:bg-accent-primary-hover text-white";
  const unfavoritedClasses =
    "bg-surface-card hover:bg-surface-elevated text-text-primary border border-border-soft";
  const heartFillClass = favorited ? "fill-current" : "";

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 p-2 rounded-md transition-colors ${
          favorited
            ? `${favoritedClasses} border border-accent-primary`
            : unfavoritedClasses
        }`}
        title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart className={`w-4 h-4 ${heartFillClass}`} aria-hidden="true" />
        <span className="text-sm">{favorited ? "Favorito" : "Favoritar"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors ${
        favorited ? favoritedClasses : unfavoritedClasses
      }`}
      aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart className={`w-5 h-5 ${heartFillClass}`} aria-hidden="true" />
      <span>{favorited ? "Remover dos Favoritos" : "Favoritar"}</span>
    </button>
  );
}
