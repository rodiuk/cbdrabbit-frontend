import type { Metadata } from "next";
import { i18n, Locale } from "../../../i18n.config";

export const SITE_NAME = "CBD Rabbit";

const DEFAULT_DESCRIPTIONS: Record<Locale, string> = {
  en: "CBD Rabbit is a store of delicious candies made with natural hemp.",
  uk: "CBD Rabbit - магазин смачних цукерок на основі натуральної коноплі",
};

const trimText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}...` : text;

const buildLocalizedPath = (lang: Locale, canonical: string) => {
  if (canonical === "/") return `/${lang}`;

  return `/${lang}${canonical}`;
};

export const createOgImageUrl = ({
  lang,
  title,
  subtitle,
}: {
  lang: Locale;
  title: string;
  subtitle?: string;
}) => {
  const searchParams = new URLSearchParams({
    title: trimText(title, 80),
  });

  if (subtitle) {
    searchParams.set("subtitle", trimText(subtitle, 140));
  }

  return `/${lang}/api/og?${searchParams.toString()}`;
};

export const buildPageMetadata = ({
  lang,
  canonical,
  title,
  description,
  imageTitle,
  imageSubtitle,
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
  const imageUrl = createOgImageUrl({
    lang,
    title: imageTitle || resolvedTitle,
    subtitle: imageSubtitle || resolvedDescription,
  });

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        i18n.locales.map(locale => [locale, buildLocalizedPath(locale, canonical)])
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
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
  };
};
