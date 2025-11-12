import { StarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Rating({ rating, quantity }: { rating: number, quantity: number }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row gap-1.5 items-center" role="group" aria-label={t("rating.ariaLabel", { rating: rating.toFixed(1), count: quantity })}>
      <p className="text-sm text-gray-400">{rating.toFixed(1)}</p>
      <StarIcon fill="currentColor" className="w-4 h-4 text-accent-primary" aria-hidden="true" />
      <p className="text-sm text-gray-400">{t("rating.reviews", { count: quantity })}</p>
    </div>
  );
}