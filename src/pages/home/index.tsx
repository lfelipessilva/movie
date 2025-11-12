import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MovieCard } from "../../components/movie/card";
import { usePopularMovies } from "../../hooks/get-popular-movies";
import { useIntersectionObserver } from "../../hooks/ui/use-intersection-observer";
import { Loading } from "../../components/layout/loading";
import { Error } from "../../components/layout/error";

export function HomePage() {
  const { t } = useTranslation();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = usePopularMovies();

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const intersectionObserver = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasNextPage,
    rootMargin: "300px",
  });

  if (isPending) {
    return <Loading label={t("labels.movies")} />;
  }

  if (error) {
    return (
      <Error
        message={t("error.loadMovies")}
        onRetry={refetch}
      />
    );
  }

  const movies = data.pages.flatMap((page) => page.results);

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <section aria-labelledby="popular-movies-heading">
        <h1 id="popular-movies-heading" className="sr-only">
          {t("home.heading")}
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div
            ref={intersectionObserver}
            className="flex justify-center py-8"
            role="status"
            aria-live="polite"
          >
            {isFetchingNextPage
              ? t("loading.loadingMore")
              : hasNextPage
              ? t("loading.scrollForMore")
              : t("loading.endOfList")}
          </div>
        </div>
      </section>
    </div>
  );
}
