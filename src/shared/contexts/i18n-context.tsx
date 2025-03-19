"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../../locales/en/common.json";

import viCommon from "../../locales/vi/common.json";

const resources = {
  en: {
    common: enCommon,
    /* home: enHome,
    profile: enProfile, */
  },
  vi: {
    common: viCommon,
    /* home: viHome,
    profile: viProfile, */
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: ["common", "home", "profile"],
  defaultNS: "common",
});

export default i18n;
