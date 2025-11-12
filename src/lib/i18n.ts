import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "../locales/en/translation.json";
import ptTranslations from "../locales/pt/translation.json";

const convertDetectedLanguage = (lng: string): string => {
  const supportedLanguages = ["en", "pt"];
  const normalizedLng = lng.toLowerCase().split("-")[0];
  
  if (supportedLanguages.includes(normalizedLng)) {
    return normalizedLng;
  }
  
  return "en";
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    fallbackLng: "en",
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      convertDetectedLanguage,
    },
  });

export default i18n;

