import { useSearchParams } from "react-router";
import { useMovieByQuery } from "../../hooks/get-movie-by-query";
import { MovieCard } from "../../components/movie/card";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data: movies, isPending, error } = useMovieByQuery({ q: q ?? "" });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mx-auto px-4 pb-16">
        {movies?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
