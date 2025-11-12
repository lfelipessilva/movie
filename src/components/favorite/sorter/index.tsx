import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "react-router";

export function FavoriteSorter({
  sortBy,
  order,
}: {
  sortBy: "title" | "rating" | null;
  order: "asc" | "desc" | null;
}) {
  const [, setSearchParams] = useSearchParams();

  const handleSortBy = (by: "title" | "rating") => {
    if (sortBy === null) {
      setSearchParams({ sortBy: by, order: "desc" });
    } else if (sortBy === by && order === "desc") {
      setSearchParams({ sortBy: by, order: "asc" });
    } else if (sortBy === by && order === "asc") {
      setSearchParams({});
    } else if (sortBy !== by) {
      setSearchParams({ sortBy: by, order: "desc" });
    }
  };

  const isTitleActive = sortBy === "title";
  const isRatingActive = sortBy === "rating";
  const titleOrder = isTitleActive ? order : null;
  const ratingOrder = isRatingActive ? order : null;

  const getTitleLabel = () => {
    if (!isTitleActive) return "Ordenar por título";
    if (titleOrder === "asc") return "Ordenado por título (crescente), clique para ordenar decrescente";
    if (titleOrder === "desc") return "Ordenado por título (decrescente), clique para remover ordenação";
    return "Ordenar por título";
  };

  const getRatingLabel = () => {
    if (!isRatingActive) return "Ordenar por nota";
    if (ratingOrder === "asc") return "Ordenado por nota (crescente), clique para ordenar decrescente";
    if (ratingOrder === "desc") return "Ordenado por nota (decrescente), clique para remover ordenação";
    return "Ordenar por nota";
  };

  return (
    <div className="flex justify-end pt-4 pr-4 gap-2">
      <button
        onClick={() => handleSortBy("title")}
        className={`flex items-center gap-1 border border-accent-primary text-white text-sm px-3 py-2 rounded-3xl ${
          sortBy === "title" ? "bg-accent-primary" : ""
        }`}
        aria-label={getTitleLabel()}
        aria-pressed={isTitleActive}
      >
        Título
        {sortBy === "title" && order === "asc" ? (
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        ) : sortBy === "title" && order === "desc" ? (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        ) : null}
      </button>
      <button
        onClick={() => handleSortBy("rating")}
        className={`flex items-center gap-1 border border-accent-primary text-white text-sm px-3 py-2 rounded-3xl ${
          sortBy === "rating" ? "bg-accent-primary" : ""
        }`}
        aria-label={getRatingLabel()}
        aria-pressed={isRatingActive}
      >
        Nota
        {sortBy === "rating" && order === "asc" ? (
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        ) : sortBy === "rating" && order === "desc" ? (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        ) : null}
      </button>
    </div>
  );
}
