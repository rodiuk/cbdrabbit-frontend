import type { Metadata } from "next";
import { i18n, Locale } from "../../../i18n.config";

export const SITE_NAME = "CBD Rabbit";

const DEFAULT_DESCRIPTIONS: Record<Locale, string> = {
  en: "CBD Rabbit is a store of delicious candies made with natural hemp.",
  uk: "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
};

const buildLocalizedPath = (lang: Locale, canonical: string) => {
  if (canonical === "/") return `/${lang}`;

  return `/${lang}${canonical}`;
};

const OG_LARGE = "/img/og/og_large.webp";
const OG_SMALL = "/img/og/og_small.webp";

export const buildPageMetadata = ({
  lang,
  canonical,
  title,
  description,
  imageTitle: _imageTitle,
  imageSubtitle: _imageSubtitle,
}: {
  lang: Locale;
  canonical: string;
  title?: string;
  description?: string;
  imageTitle?: string;
  imageSubtitle?: string;
}): Metadata => {
  const resolvedTitle = title || SITE_NAME;
  const resolvedDescription = description || DEFAULT_DESCRIPTIONS[lang];

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        i18n.locales.map(locale => [
          locale,
          buildLocalizedPath(locale, canonical),
        ])
      ),
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: OG_LARGE,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
        {
          url: OG_SMALL,
          width: 600,
          height: 315,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [OG_SMALL],
    },
  };
};
