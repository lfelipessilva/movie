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
      <div className="flex flex-col items-center justify-center h-dvh gap-8 px-4">
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div className="relative bg-surface-elevated rounded-full">
            <Clapperboard className="w-16 h-16 text-accent-primary" />
          </div>

          <div className="space-y-3">
            <h1 className="text-text-primary text-3xl md:text-4xl font-bold">
              {t("favorite.none")}
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              {t("favorite.noneDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
            aria-label={t("favorite.noneButtonAriaLabel")}
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
      <section aria-labelledby="favorites-heading">
        <h1 id="favorites-heading" className="sr-only">
          {t("favorite.heading")}
        </h1>
        <FavoriteSorter sortBy={sortBy} order={order} />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
