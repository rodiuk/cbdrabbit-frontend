"use server";

import { Locale } from "../../../i18n.config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("./dict/en.json").then(module => module.default),
  uk: () => import("./dict/uk.json").then(module => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
