import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { FavoriteSorter } from "../../components/favorite/sorter";
import { MovieCard } from "../../components/movie/card";
import { useFavoriteMovies } from "../../hooks/get-favorite-movies";
import { Loading } from "../../components/layout/loading";
import { Error } from "../../components/layout/error";
import { Clapperboard } from "lucide-react";

export function FavoritesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") as "title" | "rating" | null;
  const order = searchParams.get("order") as "asc" | "desc" | null;

  const { movies, isLoading, hasError, refetch } = useFavoriteMovies({
    sortBy,
    order,
  });

  if (!hasError && !isLoading && movies.length === 0) {
    return (
      <div className="bg-surface-primary text-text-primary min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-8 max-w-md text-center">
          <div className="relative bg-surface-elevated rounded-full p-6">
            <Clapperboard className="w-16 h-16 text-accent-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-text-primary text-3xl md:text-4xl font-bold">
              {t("favorite.none")}
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              {t("favorite.noneDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary-hover text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 shadow-lg shadow-accent-primary/20"
          >
            {t("favorite.noneButton")}
          </button>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <Error
        message={t("error.loadFavorites")}
        onRetry={refetch}
        showHomeButton
      />
    );
  }

  if (isLoading) {
    return <Loading label={t("labels.favoriteMovies")} />;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <FavoriteSorter sortBy={sortBy} order={order} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
