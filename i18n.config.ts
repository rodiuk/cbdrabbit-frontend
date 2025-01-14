export const i18n = {
  defaultLocale: "uk",
  locales: ["en", "uk"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
