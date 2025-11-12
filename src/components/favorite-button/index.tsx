import { Heart } from "lucide-react";
import { useFavorites } from "../../hooks/use-favorites";

interface FavoriteButtonProps {
  movieId: number;
  variant?: "compact" | "full";
  onClick?: (e: React.MouseEvent) => void;
}

export function FavoriteButton({
  movieId,
  variant = "full",
  onClick,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movieId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movieId);
    onClick?.(e);
  };

  const favoritedClasses = "bg-accent-primary hover:bg-accent-primary-hover text-white";
  const unfavoritedClasses = "bg-surface-card hover:bg-surface-elevated text-text-primary border border-border-soft";
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
        <Heart className={`w-4 h-4 ${heartFillClass}`} />
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
    >
      <Heart className={`w-5 h-5 ${heartFillClass}`} />
      <span>{favorited ? "Remover dos Favoritos" : "Favoritar"}</span>
    </button>
  );
}
