import { useSearchParams } from "react-router";
import { useMovieByQuery } from "../../hooks/get-movie-by-query";
import { MovieCard } from "../../components/movie/card";
import { Loading } from "../../components/layout/loading";
import { Error } from "../../components/layout/error";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data: movies, isPending, error, refetch } = useMovieByQuery({ q: q ?? "" });

  if (isPending) {
    return (
      <Loading label="resultados da pesquisa" />
    );
  }

  if (error) {
    return (
      <Error
        message="Erro ao carregar resultados da pesquisa"
        onRetry={refetch}
        showHomeButton
      />
    );
  }

  if (!movies?.results || movies.results.length === 0) {
    return (
      <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <h1 className="text-3xl font-bold mb-4">Nenhum resultado encontrado</h1>
          <p className="text-text-secondary">
            {q ? `Não foram encontrados filmes para "${q}"` : "Digite um termo de pesquisa para buscar filmes"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
        {movies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
