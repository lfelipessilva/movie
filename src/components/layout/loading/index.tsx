import { useTranslation } from "react-i18next";

export function Loading({ label }: { label: string }) {
  const { t } = useTranslation();
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={t("loading.loading", { label })}
      className="flex flex-col items-center justify-center h-dvh gap-8"
    >
      <div className="animate-spin rounded-full h-24 w-24 border border-b-2 border-accent-primary" />
      <span className="text-text-secondary text-2xl md:text-3xl">
        {t("loading.loading", { label })}
      </span>
    </div>
  );
}
