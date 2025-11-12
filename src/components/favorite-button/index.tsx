import { Heart } from "lucide-react";
import { useFavorites } from "../../hooks/use-favorites";

interface FavoriteButtonProps {
  movieId: number;
  variant?: "compact" | "full";
  onClick?: (e: React.MouseEvent) => void;
}

export function FavoriteButton({ movieId, variant = "full", onClick }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movieId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movieId);
    onClick?.(e);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary-hover text-white p-2 rounded-md transition-colors ${
          favorited ? "opacity-100" : "opacity-90 hover:opacity-100"
        }`}
        title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
        <span className="text-sm">{favorited ? "Favorito" : "Favoritar"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors ${
        favorited
          ? "bg-accent-primary hover:bg-accent-primary-hover text-white"
          : "bg-surface-card hover:bg-surface-elevated text-text-primary border border-border-soft"
      }`}
    >
      <Heart className={`w-5 h-5 ${favorited ? "fill-current" : ""}`} />
      <span>{favorited ? "Remover dos Favoritos" : "Favoritar"}</span>
    </button>
  );
}

