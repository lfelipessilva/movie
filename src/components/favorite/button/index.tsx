import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../../../hooks/ui/use-favorites";

interface FavoriteButtonProps {
  movieId: number;
  variant?: "compact" | "full";
}

export function FavoriteButton({
  movieId,
  variant = "full",
}: FavoriteButtonProps) {
  const { t } = useTranslation();
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
        title={favorited ? t("favorite.remove") : t("favorite.add")}
      >
        <Heart className={`w-4 h-4 ${heartFillClass}`} aria-hidden="true" />
        <span className="text-sm">{favorited ? t("favorite.favorited") : t("favorite.favorite")}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors ${
        favorited ? favoritedClasses : unfavoritedClasses
      }`}
      aria-label={favorited ? t("favorite.remove") : t("favorite.add")}
    >
      <Heart className={`w-5 h-5 ${heartFillClass}`} aria-hidden="true" />
      <span>{favorited ? t("favorite.unfavorite") : t("favorite.favorite")}</span>
    </button>
  );
}
