import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

import { i18n } from "../i18n.config";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders })
    .languages()
    ?.map(lang => lang.replace("*", "en"));

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    console.log("redirecting, locale is missing");
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|next.svg|vercel.svg|favicon.ico|robots.txt|sitemap.xml).*)",
    "/profile",
    "/order",
  ],
};
