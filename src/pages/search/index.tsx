import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useMovieByQuery } from "../../hooks/get-movie-by-query";
import { MovieCard } from "../../components/movie/card";
import { Loading } from "../../components/layout/loading";
import { Error } from "../../components/layout/error";
import { useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/ui/use-intersection-observer";

export function SearchPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    error,
    refetch,
  } = useMovieByQuery({ q: q ?? "" });

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
    return <Loading label={t("labels.searchResults")} />;
  }

  if (error) {
    return (
      <Error
        message={t("error.loadSearch")}
        onRetry={refetch}
        showHomeButton
      />
    );
  }

  const movies = data.pages.flatMap((page) => page.results);

  if (!movies || movies.length === 0) {
    return (
      <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <h1 className="text-3xl font-bold mb-4">
            {t("search.noResults")}
          </h1>
          <p className="text-text-secondary">
            {q
              ? t("search.noResultsDescription", { query: q })
              : t("search.noQuery")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
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
  );
}
