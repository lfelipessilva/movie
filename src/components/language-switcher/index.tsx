import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
  ];

  const currentLanguage = i18n.language;

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 border border-border-soft rounded-md overflow-hidden">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              currentLanguage === lang.code
                ? "bg-accent-primary text-white"
                : "bg-surface-card text-text-secondary hover:bg-surface-elevated"
            }`}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={currentLanguage === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

