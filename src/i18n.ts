// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "wallet": "Wallet",
      "language": "EN"
    }
  },
  ja: {
    translation: {
      "wallet": "ウォレット",
      "language": "JA"
    }
  },
  ru: {
    translation: {
      "wallet": "Кошелек",
      "language": "RU"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
