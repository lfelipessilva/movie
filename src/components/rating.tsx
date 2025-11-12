import { StarIcon } from "lucide-react";

export function Rating({ rating, quantity }: { rating: number, quantity: number }) {
  return (
    <div className="flex flex-row gap-1.5 items-center">
      <p className="text-sm text-gray-400">{rating.toFixed(1)}</p>
      <StarIcon fill="currentColor" className="w-4 h-4 text-accent-primary" />
      <p className="text-sm text-gray-400">{quantity} avaliações</p>
    </div>
  );
}