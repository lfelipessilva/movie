import { useTranslation } from "react-i18next";

export function SkipLink() {
  const { t } = useTranslation();

  return (
    <a
      href="#main-content"
      className="absolute left-[-9999px] w-1 h-1 focus:left-4 focus:top-4 focus:z-50 focus:w-auto focus:h-auto focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-white focus:rounded-md focus:outline-2 focus:outline-accent-primary focus:outline-offset-2"
    >
      {t("a11y.skipToMain")}
    </a>
  );
}

