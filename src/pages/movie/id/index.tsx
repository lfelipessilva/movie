import { useParams, useNavigate } from "react-router";
import { useMovieById } from "../../../hooks/get-movie-by-id";
import { useMovieImage } from "../../../hooks/get-movie-image";
import { Rating } from "../../../components/rating";
import { FavoriteButton } from "../../../components/favorite/button";
import { ArrowLeft } from "lucide-react";

export function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useMovieById({ id: Number(id) });
  const { url: posterUrl } = useMovieImage({ path: data?.poster_path ?? null, width: 300 });
  const { url: backdropUrl } = useMovieImage({ path: data?.backdrop_path ?? null, width: 1280 });

  const movieId = Number(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary">Carregando...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Filme não encontrado</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-accent-primary hover:bg-accent-primary-hover text-white px-6 py-2 rounded-md"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const releaseDate = new Date(data.release_date);
  const formattedDate = releaseDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <div className="relative h-[85vh] overflow-hidden">
        {backdropUrl && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${backdropUrl})`,
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-surface-primary/80 to-surface-primary" />
            <div className="absolute inset-0 bg-linear-to-r from-surface-primary via-surface-primary/60 to-transparent" />
          </>
        )}
        {!backdropUrl && (
          <div className="absolute inset-0 bg-surface-elevated" />
        )}

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-8 flex items-center gap-2 text-text-primary hover:text-text-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>

            <div className="flex gap-8 max-w-7xl">
              {posterUrl && (
                <div className="shrink-0 hidden md:block">
                  <img
                    src={posterUrl}
                    alt={data.title}
                    className="w-80 h-128 rounded-lg shadow-2xl object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col justify-center gap-6 flex-1">
                <div>
                  <h1 className="text-6xl font-bold mb-4 text-text-primary">
                    {data.title}
                  </h1>
                  
                  {data.genres && data.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {data.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-surface-card border border-border-soft rounded-full text-sm text-text-secondary"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mb-6 text-text-secondary">
                    <div>
                      <span className="font-semibold">Data de Lançamento: </span>
                      {formattedDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Nota: </span>
                      <Rating rating={data.vote_average} quantity={data.vote_count} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FavoriteButton movieId={movieId} variant="full" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-3 text-text-primary">Sinopse</h2>
                  <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                    {data.overview || "Sinopse não disponível."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-primary min-h-[15vh]" />
    </div>
  );
}
