// import { NextRequest, NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
// import Negotiator from "negotiator";

// import { match as matchLocale } from "@formatjs/intl-localematcher";

// import { i18n } from "../i18n.config";

// function getLocale(request: NextRequest): string | undefined {
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // @ts-ignore locales are readonly
//   const locales: string[] = i18n.locales;
//   const languages = new Negotiator({ headers: negotiatorHeaders })
//     .languages()
//     ?.map(lang => lang.replace("*", "uk"));

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);
//   return locale;
//   // return i18n.defaultLocale;
// }

// function intlMiddleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const searchParams = request.nextUrl.searchParams.toString();

//   const pathnameIsMissingLocale = i18n.locales.every(
//     locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     const newUrl = new URL(
//       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
//       request.url
//     );

//     if (searchParams) {
//       newUrl.search = searchParams;
//     }

//     return NextResponse.rewrite(newUrl);
//   }

//   return NextResponse.next();
// }

// const authMiddleware = withAuth(
//   function onSuccess(req) {
//     return intlMiddleware(req);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token != null,
//     },
//     pages: {
//       signIn: "/signIn",
//     },
//   }
// );

// export function middleware(request: NextRequest) {
//   const excludePattern =
//     "^(/(" + i18n.locales.join("|") + "))?/(profile|orders)/?.*?$";
//   const publicPathnameRegex = RegExp(excludePattern, "i");
//   const isPublicPage = !publicPathnameRegex.test(request.nextUrl.pathname);

//   request.headers.set("Cache-Control", "no-store, max-age=0");

//   if (isPublicPage) {
//     return intlMiddleware(request);
//   } else {
//     return (authMiddleware as any)(request);
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|img|_next/image|favicon.ico|robots.txt|site.webmanifest|google900468595d9ed7b3.html|sitemap.xml).*)",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "../i18n.config";

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => (headers[k] = v));
  const locales = i18n.locales as unknown as string[];
  const langs = new Negotiator({ headers })
    .languages()
    ?.map(l => l.replace("*", "uk"));
  return matchLocale(langs, locales, i18n.defaultLocale);
}

function intlMiddleware(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const missingLocale = i18n.locales.every(
    loc => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`
  );
  if (missingLocale) {
    // const locale = getLocale(request);
    console.log(getLocale(request));
    const locale = "uk";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    url.search = search;

    const res = NextResponse.rewrite(url);
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

const authMiddleware = withAuth(
  () => {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  },
  {
    callbacks: { authorized: ({ token }) => !!token },
    pages: { signIn: "/signin" },
  }
);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Пропускаємо NextAuth API та сторінку входу
  if (pathname.startsWith("/api/auth") || pathname === "/signin") {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  }

  // 2) Intl
  const intlRes = intlMiddleware(request);
  if (intlRes) return intlRes;

  // 3) Захищені маршрути
  const protectedPaths = ["profile", "orders"];
  const isProtected = protectedPaths?.some(p =>
    i18n.locales.some(loc => pathname.startsWith(`/${loc}/${p}`))
  );
  if (isProtected) {
    return authMiddleware(request as any, request as any);
  }

  // 4) Інші — лише no-cache
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|img|_next/image|favicon.ico|robots.txt|site.webmanifest|google900468595d9ed7b3.html|sitemap.xml).*)",
  ],
};
