"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LanguageDetectorModule } from "i18next";
import translateEN from "./Lang/en.json";
import translateAr from "./Lang/ar.json";

const resources = {
  en: {
    translation: translateEN,
  },
  ar: {
    translation: translateAr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
