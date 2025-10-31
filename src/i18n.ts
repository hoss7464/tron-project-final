// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import enTranslation from "./assets/locales/en/translation";
import jaTranslation from "./assets/locales/ja/translation";
import ruTranslation from "./assets/locales/ru/translation";
import cnTranslation from "./assets/locales/cn/translation";
import krTranslation from "./assets/locales/kr/translation";
import trTranslation from "./assets/locales/tr/translation";
import idTranslation from "./assets/locales/id/translation";
import esTranslation from "./assets/locales/es/translation";
import inTranslation from "./assets/locales/in/translation";

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // browser detector
  .use(HttpApi) // optional if you use backend, it's fine
  .init({
    resources: {
      en: { translation: enTranslation }, // English (default)
      ja: { translation: jaTranslation }, // Japenese 
      ru: { translation: ruTranslation }, // Russian 
      cn: { translation: cnTranslation }, // Chinese 
      kr: { translation: krTranslation }, // Korean
      tr: { translation: trTranslation }, // Turkish 
      id: { translation: idTranslation }, // Indonesian 
      es: { translation: esTranslation }, // Spanish
      in: { translation: inTranslation }, // Indian 
    },
    supportedLngs: ["en", "ja", "ru", "cn", "kr", "tr", "id", "es", "in"],
    fallbackLng: "en",
    detection: {
      // prioritize localStorage so the saved language is used first
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      // enable caching to localStorage (so i18next saves language there automatically)
      caches: ["localStorage"],
      // default lookup key in localStorage is "i18nextLng" — you can change it:
      // lookupLocalStorage: "myAppLng"
      // optional: set cookieMinutes if you also cache to cookies
      // cookieMinutes: 10080,
    },
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false,
    },
  });

// Optional: if you want to run custom side-effects on language change
i18n.on("languageChanged", (lng) => {
  // ensures language saved under the key "i18nextLng" (same as caches above)
  try {
    localStorage.setItem("i18nextLng", lng);
  } catch (e) {
    // ignore if localStorage not available
  }
});

export default i18n;
