// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import enTranslation from "./assets/locales/en/translation"
import jaTranslation from "./assets/locales/ja/translation"
import ruTranslation from "./assets/locales/ru/translation"

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources : {
        en: { translation: enTranslation },
        ja: { translation: jaTranslation },
        ru: { translation: ruTranslation }
    },
    supportedLngs :["en", "ja", "ru"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
    },
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
