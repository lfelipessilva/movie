import { useCallback } from "react";
import { MovieCard } from "../../components/movie/card";
import { usePopularMovies } from "../../hooks/get-popular-movies";
import { useIntersectionObserver } from "../../hooks/ui/use-intersection-observer";
import { Loading } from "../../components/layout/loading";
import { Error } from "../../components/layout/error";

export function HomePage() {
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
    return <Loading label="filmes" />;
  }

  if (error) {
    return (
      <Error
        message="Erro ao carregar filmes"
        onRetry={refetch}
      />
    );
  }

  const movies = data.pages.flatMap((page) => page.results);

  return (
    <div className="bg-gray-800 text-white min-h-screen">
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
            ? "Carregando mais filmes..."
            : hasNextPage
            ? "Scroll para mais filmes"
            : "Você chegou ao final da lista de filmes"}
        </div>
      </div>
    </div>
  );
}
