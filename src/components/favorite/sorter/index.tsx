import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export function FavoriteSorter({
  sortBy,
  order,
}: {
  sortBy: "title" | "rating" | null;
  order: "asc" | "desc" | null;
}) {
  const { t } = useTranslation();
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
    if (!isTitleActive) return t("sorter.sortByTitle");
    if (titleOrder === "asc") return t("sorter.sortedByTitleAsc");
    if (titleOrder === "desc") return t("sorter.sortedByTitleDesc");
    return t("sorter.sortByTitle");
  };

  const getRatingLabel = () => {
    if (!isRatingActive) return t("sorter.sortByRating");
    if (ratingOrder === "asc") return t("sorter.sortedByRatingAsc");
    if (ratingOrder === "desc") return t("sorter.sortedByRatingDesc");
    return t("sorter.sortByRating");
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
        {t("sorter.title")}
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
        {t("sorter.rating")}
        {sortBy === "rating" && order === "asc" ? (
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        ) : sortBy === "rating" && order === "desc" ? (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        ) : null}
      </button>
    </div>
  );
}
