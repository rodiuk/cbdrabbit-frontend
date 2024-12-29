import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
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
    ?.map(lang => lang.replace("*", "uk"));

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

function intlMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams.toString();

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    );

    if (searchParams) {
      newUrl.search = searchParams;
    }

    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      // signIn: "/auth/login",
    },
  }
);

export function middleware(request: NextRequest) {
  const excludePattern =
    "^(/(" + i18n.locales.join("|") + "))?/(profile|orders)/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(request.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(request);
  } else {
    return (authMiddleware as any)(request);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|img|_next/image|favicon.ico|robots.txt|site.webmanifest|sitemap.xml).*)",
  ],
};
