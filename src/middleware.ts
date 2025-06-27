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

// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "../i18n.config";

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));
  const locales = i18n.locales as unknown as string[];
  const languages = new Negotiator({ headers })
    .languages()
    ?.map(l => l.replace("*", "uk"));
  return matchLocale(languages, locales, i18n.defaultLocale);
}

function intlMiddleware(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const missingLocale = i18n.locales.every(
    loc => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`
  );
  if (missingLocale) {
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    url.search = search;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// з конфігом сторінки входу
const authMiddleware = withAuth(() => NextResponse.next(), {
  callbacks: { authorized: ({ token }) => !!token },
  pages: { signIn: "/signin" },
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Пропускаємо NextAuth API та сторінку входу
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/signin" ||
    pathname.startsWith("/api/webhooks") // якщо є інші API, додайте сюди
  ) {
    return NextResponse.next();
  }

  // 2) Інтернаціоналізація для всіх публічних маршрутів
  const intlResult = intlMiddleware(request);
  if (intlResult !== NextResponse.next()) {
    return intlResult;
  }

  // 3) Захищені маршрути (/profile, /orders) з урахуванням локалі
  const protectedPaths = ["profile", "orders"];
  const isProtected = protectedPaths.some(p =>
    i18n.locales.some(loc => pathname.startsWith(`/${loc}/${p}`))
  );
  if (isProtected) {
    return authMiddleware(request as any, request as any);
  }

  // 4) Все інше — просто пропускаємо
  return NextResponse.next();
}

export const config = {
  matcher: [
    // всі шляхи, крім статики й image optimizer
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|site.webmanifest).*)",
  ],
};
